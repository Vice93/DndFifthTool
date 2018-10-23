const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const ClassSpellMap = new Schema({
  spellIndex: Number,
  classIndex: Number,
  spellname: String,
  classname: String,
  level: Number
});

module.exports = mongoose.model('ClassSpellMap', ClassSpellMap);
