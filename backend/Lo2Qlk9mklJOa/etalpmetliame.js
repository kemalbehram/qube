var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var emailtemplateSchema = new Schema({
  "title": String,
  "mailsubject": String,
  "mailcontent": String,
  "createddate": { type: Date, default: Date.now },
  "modifieddate": { type: Date, default: Date.now }
});
module.exports = mongoose.model('emailtemplate', emailtemplateSchema, config.DB_prefix+'etalpmetliame')


