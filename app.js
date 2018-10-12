/*
// jshint esversion: 6
// Created by: Jonas Vestgarden
// Date: 11.10.2018
*/
const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const dbConfig = require('./config/database');
const path = require('path');
// Allows a server and frontend data transfer AkA cross origin
const cors = require('cors');
//Error handling log to file
const logger = require('./services/logger.js');
//SET domain='localhost:8080'
const domain = process.env.domain;

app.use(cors({
  origin: [
    'http://localhost:4200'
  ],
  optionsSuccessStatus:200
}));

//DB connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.uri, { useNewUrlParser: true }, (err) => {
  if(err){
    logger('DB','error',err);
  }
  else {
    logger('DB','info','--DB CONNECTED-- ' + dbConfig.secret);
  }
});

/**
* use dist directory to get the response page when requested
*/
app.use(express.static(__dirname + '/client/dist/'));

app.use('*', (req, res) => {
  if(req.method === 'GET' || req.url === '/'){
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
  }
});

//create a cors middleware
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//specify port to listen to
const port = 8080;
app.listen(port, () => {
  console.log('Server listening on port: '+ port);
});
