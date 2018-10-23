/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ClassSpellMap = require('../model/map_spells_classes');
const logger = require('../services/logger.js');

function jsonResponse(req, res, err, data, query){
  if(req == null || req.query == null || query == null) {
    res.status(400);
    return {success: false, message: 'Query param is missing.'};
  } else if (err) {
    res.status(500);
    return {success: false, message: 'An error occured', error: err};
  } else if(data.length == 0) {
    res.status(204);
    return {success: true, message: 'No results found', data};
  } else if (query.post == "post") {
    res.status(200);
    return {success: true, message: 'Data saved successfully.'};
  } else {
    res.status(200);
    return {success: true, data};
  }
}

module.exports = (router) => {

  router.get('/getSpellMap', (req, res) => {
    console.log(req.query.classIndex);
    console.log(req.query);
    const query = req.query.classIndex;
    ClassSpellMap.find({ classIndex: query }).exec((err, spells) => {
      res.json(jsonResponse(req,res,err,spells,query));
    });
  });

  router.post('/mapSpellToDb', (req, res) => {
    let spell = new ClassSpellMap ({
      spellIndex: req.body.spellIndex,
      spellname: req.body.spellname,
      classIndex: req.body.classIndex,
      classname: req.body.classname,
      level: req.body.level
    });
    spell.save((err) => {
      req.query = "";
      res.json(jsonResponse(req,res,err,[""],{ post:"post" }))
    });
  });

  return router;
}
