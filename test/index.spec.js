describe("#ws-mock", function () {
    var assert = require("assert"),
        sinon = require('sinon'),
        WsServerMock = require('../index').WsServer,
        srv = new MyServer(new WsServerMock());

    it("should add connection", function (done) {
        var ws = srv.getWsServer().addConnection();
        assert.equal(ws.readyState, 1); // opened
        assert.equal(srv.getWsServer().connections.length, 1);
        done();
    });

    it("should clear connections", function (done) {
        var ws = srv.getWsServer().addConnection();
        assert.ok(srv.getWsServer().connections.length > 0);
        srv.getWsServer().clearConnections();
        assert.equal(srv.getWsServer().connections.length, 0);
        done();
    });

    it("should send message", function (done) {
        var ws = srv.getWsServer().addConnection();
        ws.sendMsgToServer("dummy");
        assert.equal(srv.getIncomingMessages().length, 1);
        assert.equal(srv.getIncomingMessages()[0], "dummy");
        assert.equal(ws.messages[0], "dummy");
        done();
    });

    it("should close ws connection", function (done) {
        var ws = srv.getWsServer().addConnection(),
            onClosedConnectionSpy = sinon.spy(srv, "onClosedConnection");
        ws.closeConnection();
        assert.ok(onClosedConnectionSpy.calledOnce);
        assert.equal(ws.readyState, 3); // closed
        onClosedConnectionSpy.restore();
        done();
    });
});

function MyServer(wsServer) {
    var incomingMsg = [],
        that = this;

    wsServer.on('connection', function (ws) {
        console.log("new connection...");
        ws.on('message', function (msg) {
            console.log("incoming message:", msg);
            incomingMsg.push(msg);
            ws.send(msg);
        });
        ws.on('close', function () {
            console.log("connection closed...");
            that.onClosedConnection();
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
