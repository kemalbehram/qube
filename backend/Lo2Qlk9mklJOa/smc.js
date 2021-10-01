var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var cmsSchema = new Schema({
    "pagecontent":{type: String,default:""},
    "title":{type: String,default:""},
    "pagekey":{type: String,default:""},
    "status":{type: Number,default:0},
    "createddate": { type: Date, default: Date.now },
    "modifieddate":{type:Date,default:Date.now}
});
module.exports = mongoose.model('cms', cmsSchema, config.DB_prefix+'smc')
