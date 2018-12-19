'use strict'

// import express module
const express = require('express');
// import http module
const http = require('http');
// import debug module
const debug = require('debug');
// import normalizePort
const normalizePort = require('normalize-port');

const app = express();
const port = normalizePort(process.env.PORT || 3000);

app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

let route = router.get('/', (req, res, next)=>{
    res.status(200).send({
        title:'Node JS API',
        version: "0.0.1"
    });
});

app.use('/', route);

server.listen(port);
console.log('Api server on 3000');
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === "string" ?
    'Pipe ' + port :
    'Port ' + port;
    
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' require elevated privileges');
            process.exit(1);
            break;
        
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;

        default:
            throw error;
    }
}

function onListening () {
    const addr = server.address();
    const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('listening on ' +  bind);     
}