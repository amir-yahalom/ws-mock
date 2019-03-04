describe("#ws-mock", function () {
    const assert = require("assert");
    const sinon = require('sinon');
    const { WsServer } = require('../index');
    const srv = new MyServer(new WsServer());

    it("should add connection", () => {
        const ws = srv.getWsServer().addConnection();
        assert.equal(ws.readyState, 1); // opened
        assert.equal(srv.getWsServer().connections.length, 1);
    });

    it("should clear connections", () => {
        const ws = srv.getWsServer().addConnection();
        assert.ok(srv.getWsServer().connections.length > 0);
        srv.getWsServer().clearConnections();
        assert.equal(srv.getWsServer().connections.length, 0);
    });

    it("should send message", () => {
        const ws = srv.getWsServer().addConnection();
        ws.sendMsgToServer("dummy");
        assert.equal(srv.getIncomingMessages().length, 1);
        assert.equal(srv.getIncomingMessages()[0], "dummy");
        assert.equal(ws.messages[0], "dummy");
    });

    it("should close ws connection", () => {
        const ws = srv.getWsServer().addConnection();
        const onClosedConnectionSpy = sinon.spy(srv, "onClosedConnection");
        ws.closeConnection();
        assert.ok(onClosedConnectionSpy.calledOnce);
        assert.equal(ws.readyState, 3); // closed
        onClosedConnectionSpy.restore();
    });
});

function MyServer(wsServer) {
    const incomingMsg = [];

    wsServer.on('connection', (ws) => {
        console.log("new connection...");
        ws.on('message', (msg) => {
            console.log("incoming message:", msg);
            incomingMsg.push(msg);
            ws.send(msg);
        });
        ws.on('close', () => {
            console.log("connection closed...");
            this.onClosedConnection();
        });
    });

    this.getWsServer = function () {
        return wsServer;
    };

    this.getIncomingMessages = function () {
        return incomingMsg;
    };

    this.onClosedConnection = function () {};
}
