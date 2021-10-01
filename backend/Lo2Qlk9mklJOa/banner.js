var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var bannerSchema = new Schema({
    "heading1":{type: String,default:""},
    "heading2":{type: String,default:""},
    "heading3":{type: String,default:""},
    "button_txt":{type: String,default:""},
    "image":{type: String,default:""},
    "status":{type: Number,default:0},
    "createddate": { type: Date, default: Date.now },
    "modifieddate":{type:Date,default:Date.now}
});
module.exports = mongoose.model('banner', bannerSchema, config.DB_prefix+'rennab')
