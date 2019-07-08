
var http = require("http");

process.env.PORT = 3000;

var PORT = process.env.PORT;

if (PORT == null){
  PORT = 3000;

}

console.log("PORT:", process.env.PORT);

var fs = require('fs');

var indexFile;
var indexjsFile;
var styleFile;
var badFile;

fs.readFile('public/index.html','utf8', function (err, data) {
  if (err) {
    throw err;
  }
  indexFile = data;
});


fs.readFile('public/index.js','utf8', function (err, data) {
  if (err) {
    throw err;
  }
  indexjsFile = data;
});

fs.readFile('public/style.css','utf8', function (err, data) {
  if (err) {
    throw err;
  }
  styleFile = data;
});

fs.readFile('public/404.html','utf8', function (err, data) {
  if (err) {
    throw err;
  }
  badFile = data;
});

function requestHandler(req, res) {

if (req.url == '/' || req.url == 'public/index.html' || req.url == '/index.html'){

  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(indexFile);
  res.end();

  console.log("statusCode", res.statusCode);
}



else if (req.url == 'public/index.js' || req.url == '/index.js'){

  res.writeHead(200, {"Content-Type": "text/js"});
  res.write(indexjsFile);
  res.end();

  console.log("statusCode", res.statusCode);
  }



else if (req.url == 'public/style.css' || req.url == '/style.css'){

  res.writeHead(200, {"Content-Type": "text/css"});
  res.write(styleFile);
  res.end();

  console.log("statusCode", res.statusCode);
  }


else if (req.url == 'public/404.html' || req.url == '/404.html'){

  res.writeHead(404, {"Content-Type": "text/html"});
  res.write(badFile);
  res.end();

  console.log("statusCode", res.statusCode);
  }

else {
  res.writeHead(404, {"Content-Type": "text/html"});
  res.write(badFile);
  res.end();

  console.log("statusCode", res.statusCode);
}

}
var server = http.createServer(requestHandler);

server.listen(3000, function (err) {

});
