var fs = require('fs');
if (process.argv.length > 2){
  var filePath = process.argv[2] || "";
  if(!fs.existsSync(filePath)){
    console.log('Please a valid existing file path!');
    process.exit(1);
  }
  else{
    console.log('writing to file at', filePath);
  }

}
else{
  console.log('File path missing!');
}

var fs = require('fs');


function writeRanTextAtNewLine(){
  try{
    fs.appendFile(filePath, `
      ${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 50)}`, function(err) {
      if(err) {
        return console.log(err);
      }
    });
  }
  catch(e){
    console.log(e);
    clearInterval(intervalId);
  }
}

var intervalId = setInterval(() => {
  writeRanTextAtNewLine();
}, 100);
