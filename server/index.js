"use strict";

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const cors = require('cors');
const methodOverride = require('method-override');
const DataSocket = require('./websockets/DataSocket');
const middlewares = require('./controllers/data');
const controllers = require('./controllers');


// ------------------------------------------
// ----- initialize database connection -----
// ------------------------------------------

require('./util/DataBaseConnection');


// ------------------------------------
// ----- express app for REST api -----
// ------------------------------------

const PORT = process.env.PORT || 9000;
const HOSTNAME = '0.0.0.0';
const PUBLIC_DIR = path.join(__dirname, 'public');


const app = express();

app.use(cors());
app.use(middlewares);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(PUBLIC_DIR));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true,
}));

app.use(controllers);

const server = http.createServer(app);


// ---------------------------------------------
// ----- web socket for data visualization -----
// ---------------------------------------------

const dataSocket = new DataSocket(server);


// ------------------------
// ----- start Server -----
// ------------------------

server.listen({ port: PORT , host: HOSTNAME }, () => {
    console.log(`Server listening at http://${HOSTNAME}:${PORT}`);
})


module.exports = {
    dataSocket,
    server,
};