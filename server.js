var http = require("http");
var fs = require("fs");
var url = require("url");

var port = 8080;
var obj = {};
obj.busy = true;

var httpServer = http.createServer(function(req, res){

  switch(req.method){



    case "GET":
    if(req.url === '/data'){
      res.writeHeader(200, {'Content-type' : 'application/json'});
      res.write(JSON.stringify(obj.busy));
      res.end();
    }
    else if(req.url === '/end'){
      res.writeHeader(200, {'Content-type' : 'application/json'});
      obj.busy = false;
      res.end();
    }
    else if(req.url === '/ready'){
      res.writeHeader(200, {'Content-type' : 'application/json'});
      obj.busy = false;
      res.end();
    }
    break;

    case "POST":
      if(!obj.busy){
        obj.busy = true;
        var data = url.parse(req.url, true).query;
        var binary_data="";
        for (var i=0; i < data.data.length; i++) {
          var tmp =  data.data[i].charCodeAt(0).toString(2);
          for(var j=0; j <= 8-tmp.length; j++){
            tmp = "0" + tmp;
          }
          binary_data += tmp;
        }
        fs.writeFile('file.txt', data.data, function(err){
          if(err) throw err;
          console.log(data.data);
        })
        res.end('recieved data!');
      }
      else{
        res.writeHeader(400, {'Content-type' : 'application/json'});
        res.write(JSON.stringify(obj.busy));
        res.end();
      }

    break;

    default:
    break
  }

  res.end();

}).listen(port, function(){
  // console.log('server running on port 8080...');
});
