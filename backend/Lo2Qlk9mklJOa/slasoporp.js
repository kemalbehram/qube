var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var pairSchema = new Schema({
  // "address"           : {type:String,default:""},
  // "amount"            : {type:Number,default:0},
  "description"       	 : {type:String,default:""},
  // "propose_id"        : {type:String,default:""},
  "user_address"      	 : {type:String,default:""},
  // "tx_id"             : {type:String,default:""},
  "status"            	 : {type:String,default:"Active"},
  "expired_date"      	 : {type:Date,default:""},
  "expired_date_stamp"   : {type:String,default:""},
  "created_date"      	 : {type: Date, default: Date.now},
  "modified_date"     	 : {type: Date, default: Date.now}
});

module.exports = mongoose.model('proposals', pairSchema, config.DB_prefix+'slasoporp')