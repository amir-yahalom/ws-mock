# ws-mock
========
Node module for mocking Web Socket (server side).
Can be very helpful if you want to test ws-dependent code.

Usage
-------
First install via npm:

- [npm](http://www.npmjs.com/): `npm install ws-mock`

simple example:
```js
  var WsServerMock = require('ws-mock').WsServer;
  // create ws server instance
  var wsServer = new WsServerMock();
  // bind events
  wsServer.on('connection', function (ws) {
  	console.log("new connection...");
  	ws.on('message', function (msg) {
  		console.log("incoming message:", msg);
  	});
  	ws.on('close', function () {
  		console.log("connection closed...");
  	});
  });
  // create ws connection 
  var wsConn = wsServer.addConnection(); // "new connection..."
  // send message that will be received by wsServer  
  wsConn.sendMsgToServer("dummy message"); // "incoming message: dummy message"
  // close a ws connection
  wsConn.closeConnection(); // "connection closed..."
  
  // clear all current connections
  wsServer.clearConnections();
```
