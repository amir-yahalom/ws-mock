var util = require("util"),
    EventEmitter = require("events").EventEmitter,
	CONNECTING = 0,
	OPENED = 1,
	CLOSED = 3;

function WsConnectionMock() {
    EventEmitter.call(this);
    this.messages = []; // output
    this.readyState = CONNECTING;
}

util.inherits(WsConnectionMock, EventEmitter);

WsConnectionMock.prototype.send = function send(msg) {
    this.messages.push(msg);
};

WsConnectionMock.prototype.close = function close() {
    this.readyState = CLOSED;
};

WsConnectionMock.prototype.open = function open() {
    this.readyState = OPENED;
};

WsConnectionMock.prototype.sendMsgToServer = function sendMsgToServer(msg) {
    this.emit("message", msg);
};

WsConnectionMock.prototype.closeConnection = function closeConnection() {
    this.close();
    this.emit("close", []);
};

module.exports = WsConnectionMock;
