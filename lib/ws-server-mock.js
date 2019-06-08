const { EventEmitter } = require('events');
const WsConnectionMock = require("./ws-connection-mock");

class WsServerMock extends EventEmitter {
    constructor() {
        super();
        this.connections = [];
    }

    addConnection() {
        const ws = new WsConnectionMock();
        ws.open();
        this.connections.push(ws);
        this.emit("connection", ws);
        return ws;
    }

    clearConnections() {
        this.connections.length = 0;
    }
}

module.exports = WsServerMock;