# tail -f using uws and nodejs
This is a custom `tail -f` command implemetation in nodejs and using browser as command output implemented over websocket. Server uses port - `9211`, you can change this in `server.js` file.

## How to run

1. Clone this repo
2. `cd ./nodetailf`
3. `npm install`
4. `node server.js <file-path>` example - `node server.js ./testFile.txt`
5. Monitor the tailed file at - http://127.0.0.1:9211 in any browser.

## Utilities
You can run `cd nodetailf & node writer.js <file-path>` to append random data at specific interval in case you want to avoid file writes manually.
