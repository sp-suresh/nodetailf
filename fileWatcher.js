const fs = require('fs');

class fileWatcher {
  constructor(path){
    this.filePath = path;
    this.fileStat = fs.statSync(this.filePath);
  }

  getLastTenLines(cb){
    if(this.fileStat.size){
      fs.readFile(this.filePath, cb);
    }
  }

  getNewDataOnFileChange(cb){
    fs.watchFile(this.filePath, (event, filename) => {
      var fileStatChanged = fs.statSync(this.filePath);
      fs.open(this.filePath, 'r', (err, fd) => {
        var newDataLength = fileStatChanged.size - this.fileStat.size;
        var buffer = Buffer.alloc(newDataLength);
        fs.read(fd, buffer, 0, newDataLength, this.fileStat.size, cb);
        this.fileStat = fs.statSync(this.filePath);
      });
    });
  }
}

module.exports = fileWatcher;