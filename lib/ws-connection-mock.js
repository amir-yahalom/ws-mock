const { EventEmitter } = require('events');

const CONNECTING = 0;
const OPENED = 1;
const CLOSED = 3;

class WsConnectionMock extends EventEmitter {
    constructor() {
        super();
        this.messages = []; // output
        this.readyState = CONNECTING;
    }

    send(msg) {
        this.messages.push(msg);
    }

    close() {
        this.readyState = CLOSED;
    }

    open() {
        this.readyState = OPENED;
    }

    sendMsgToServer(msg) {
        this.emit("message", msg);
    }

    closeConnection() {
        this.close();
        this.emit("close", []);
    }
}

module.exports = WsConnectionMock;
