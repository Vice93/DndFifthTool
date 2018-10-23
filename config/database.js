/*
** jshint esversion: 6
** Created by Jonas Vestgarden.
** Date: 11.10.2018
**
** Asynchronous db head encryption using crypto andom bytes.
** check nodejs/API's/randombytes for reference
*/
const crypto = require('crypto');
//SET db_uri = 'mongodb://localhost:27017/dnd-fifth-app'
//const db_uri = process.env.db_uri;
const db_uri = 'mongodb://localhost:27017/dnd-fifth-app';
const logger = require('../services/logger.js');
const secret = generateSecret();

//Runs on every app start, meaning connection to client needs to be refreshed for tokens etc.
function generateSecret() {
  try {
    return crypto.randomBytes(256).toString('hex');
  } catch (err) {
    logger('DbSecret','error',err);
  }
}

//hash encrypted secret head
const hashedSecret = crypto.createHmac('sha256', secret).update('DB').digest('hex');

module.exports = {
  uri: db_uri,
  secret: hashedSecret,
  tokenSecret: secret,
  db: 'dnd-fifth-app'
};
