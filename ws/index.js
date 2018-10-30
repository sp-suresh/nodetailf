const WebSocket = require('uws').Server;
const fw = require('../fileWatcher');
const {initReadLines} = require('../env');

function start(server, filePath){

  var wss = new WebSocket({
    server: server,
    path: '/wss'
  });

  const objFW = new fw(filePath);
  objFW.getNewDataOnFileChange((err, bytesRead, newData) => {
    if (err) {
      console.log(err);
    };
    wss.broadcast(newData);
  });

  wss.on('connection', function(ws){

    objFW.getLastTenLines((err, fd) => {
      var fileDataArr = fd.toString().split('\n');

      var startIX;

      if(fileDataArr.length < initReadLines){
        startIX = 0;
      }
      else{
        startIX = (fileDataArr.length - initReadLines);
      }
      for(var i = startIX; i < fileDataArr.length; i++){
        ws.send(fileDataArr[i]);
      }
    });

    console.log('new connection');
    ws.on('close', clearWS);
    ws.on('end', clearWS);
    ws.on('disconnect', clearWS);
    ws.on('error', clearWS);

    function clearWS(e){
      console.log('in clearWS', e);
    }
  });
}

module.exports.start = start;
