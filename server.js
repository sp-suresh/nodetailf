var wsServer = require('./ws');
const fs = require('fs');
var http = require('http');
const PORT = 9211;


if (process.argv.length > 2){
  var filePath = process.argv[2] || "";
  if(!fs.existsSync(filePath)){
    console.log('Please a valid existing file path!');
    process.exit(1);
  }
  else{
    console.log('watching file', filePath);
  }

}
else{
  console.log('File path missing!');
  process.exit(1);
}

var server = http.createServer((request, response) => {
  fs.readFile('./index.htm', function(error, content) {
    if (error) {
      response.writeHead(500);
      response.end();
    }
    else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    }
  });
}).listen(PORT);

wsServer.start(server, filePath);

console.log('Server started on port: ', PORT);
console.log(`Paste this link in your browser to monitor the file- http://127.0.0.1:${PORT}`);
