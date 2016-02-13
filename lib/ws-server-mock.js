var util = require("util"),
    EventEmitter = require("events").EventEmitter,
    WsConnectionMock = require("./ws-connection-mock");

function WsServerMock() {
    EventEmitter.call(this);
    this.connections = [];
}

util.inherits(WsServerMock, EventEmitter);

WsServerMock.prototype.addConnection = function addConnection() {
    var ws = new WsConnectionMock();
    ws.open();
    this.connections.push(ws);
    this.emit("connection", ws);
    return ws;
};

WsServerMock.prototype.clearConnections = function clearConnections() {
    this.connections.length = 0;
};

module.exports = WsServerMock;