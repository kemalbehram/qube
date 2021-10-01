var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var pairSchema = new Schema({
  "lot_id"        		: { type:String,default:""  },
  "email"        		: { type:String,default:""  },
  "user_address"        : { type:String,default:""  },
  "currency"      		: { type:String,default:""  },
  "requried_token"     	: { type:Number,default:0 },
  "token_rate"        	: { type:Number,default:0 },
  "spend_amount"        : { type:Number,default:0 },
  "spend_amount_usd"    : { type:Number,default:0 },
  "status"              : { type:String,default:""  },
  "created_date"        : { type: Date, default: Date.now },
  "modified_date"       : { type: Date, default: Date.now }
});

module.exports = mongoose.model('buytoken_list', pairSchema, config.DB_prefix+'tsil_nekotyub');