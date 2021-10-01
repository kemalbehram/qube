var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var pairSchema = new Schema({
  "designation"        	: { type:String,default:""  },
  "price"      			: { type:Number,default:0  },
  "price_btc"       	: { type:Number,default:0 },
  "price_eth"       	: { type:Number,default:0 },
  "price_usdt"       	: { type:Number,default:0 },
  "location"        	: { type:String,default:""  },
  "start_date"          : { type:Date, default: "" },
  "end_date"            : { type:Date, default: ""  },
  "total_supply"        : { type:Number,default:0 },
  "selled_token"        : { type:Number,default:0 },
  "status"              : { type:String,default:""  },
  "created_date"        : { type: Date, default: Date.now },
  "modified_date"       : { type: Date, default: Date.now }
});

module.exports = mongoose.model('tokenlots', pairSchema, config.DB_prefix+'stolnekot')