const WebSocket = require('uws').Server;
const fw = require('../fileWatcher');

function start(server, filePath, cb){

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

      if(fileDataArr.length < 10){
        startIX = 0;
      }
      else{
        startIX = (fileDataArr.length - 10);
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