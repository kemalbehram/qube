var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var announcementSchema = new Schema({
  // "status":String,
 "pagecontent":{type: String,default:""},
    "title":{type: String,default:""},
  "status"     :{type: String, default:'Active'},
  "createddate": { type: Date, default: Date.now },
  "modifieddate": { type: Date, default: Date.now },
});

module.exports = mongoose.model('announcement', announcementSchema, config.DB_prefix+'tnemecnuonna')