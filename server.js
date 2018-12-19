'use strict'

// import express module
const express = require('express');

// import http module
const http = require('http');

// import debug module
const debug = require('debug');


const app = express();
const port = 3000;

app.set('port', port);

// console.log(app);

const server = http.createServer(app);
const router = express.Router();

let route = router.get('/', function(req, res, next){
    res.status(200).send({
        title:'Node JS API',
        version: "0.0.1"
    });
});

app.use('/', route);

server.listen(port);