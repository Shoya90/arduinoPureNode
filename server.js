var http = require("http");
var fs = require("fs");
var url = require("url");

var port = 8080;
var obj = {};
obj.busy = false;

var httpServer = http.createServer(function(req, res){

  switch(req.method){
    case "GET":
    if(req.url === '/data'){
      res.writeHeader(200, {'Content-type' : 'application/json'});
      res.write(JSON.stringify(obj));
      res.end();
    }
    break;

    case "POST":
      var data = url.parse(req.url, true).query;
      var binary_data="";
      for (var i=0; i < data.data.length; i++) {
        var tmp =  data.data[i].charCodeAt(0).toString(2);
        for(var j=0; j <= 8-tmp.length; j++){
          tmp = "0" + tmp;
        }
        binary_data += tmp;
      }
      fs.writeFile(`./${data.row}.txt`, binary_data, function(err){
        if(err) throw err;
        console.log('finished writing to file');
      })
      res.end('recieved data!');
    break;

    default:
    break
  }

  res.end();

}).listen(port, function(){
  console.log('server running on port 8080...');
});
