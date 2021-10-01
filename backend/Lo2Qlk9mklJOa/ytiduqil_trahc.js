var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var pairSchema = new Schema({
  // new variables
    "datetime"                : { type:String,default:"" }, 
    "price"                   : { type:Number,default:0 , useCreateIndex: true}, 
    "date"                    : { type:String,default:"" , useCreateIndex: true}, 
    "created_date"            : { type: Date, default: Date.now },
    "modified_date"           : { type: Date, default: Date.now }
  // new variables
});

module.exports = mongoose.model('chart_liqudity', pairSchema, config.DB_prefix+'ytiduqil_trahc')
