"use strict";

const WebSocketServer = require('ws').Server;

class DataSocket {
    
    constructor(server) {
        this.handleConnection = this.handleConnection.bind(this);
        this.broadcast = this.broadcast.bind(this);

        this.connections = [];

        this.wss = new WebSocketServer({ server });
        this.wss.on('connection', (ws) => { this.handleConnection(ws) });
    }

    handleConnection(client) {
        const { connections } = this;
        connections.push(client);                         // add this client to the connections array

        client.on('close', function() {                   // when a client closes its connection
            const position = connections.indexOf(client); // get the client's position in the array
            connections.splice(position, 1);              // and delete it from the array
        });
    }

    broadcast(data) {
        const { connections } = this;
        for (let connection in connections) {   // iterate over the array of connections
            connections[connection].send(String(JSON.stringify(data))); // send the data to each connection
        }
    }
}

module.exports = DataSocket;
