var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var tokenHoldersSchema = new Schema({
  "holderAddress"        :{type:String,default:""},
  "balance"              :{type:String,default:""},
  "pendingBalanceUpdate" :{type:String,default:""},
  "tx_id" 		 :{type:String,default:""},
  "created_date"         : { type: Date, default: Date.now }
});

module.exports = mongoose.model('tokenHolders', tokenHoldersSchema, config.DB_prefix+'sredloHnekot')
