var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var config   = require("../config/config");

var currencySchema = new Schema({
  "currencyName"        : {type: String, default:""},  
  "currencySymbol"      : {type: String, default:""},
  "currency_type"       : {type: String, default:""},
  "currency_image"      : {type: String, default:""},
  "contract_address"    : {type: String, default:""},
  "currency_decimal"    : {type: Number, default:18},
  "status"              : {type: String, default: "Active"},
  "supply"              : {type: Number, default:0},
  "contract_add_status" : {type:Boolean,default:false},
  "poolId"              : {type:String,default:""},
  "pooltx_id"           : {type:String,default:""},
  "coingeckoId"         : {type:String,default:""},
  "USDprice"            : {type: Number, default:0},
  "created_date"        : {type: Date, default: Date.now},
  "modify_date"         : {type: Date, default: Date.now},
});

module.exports = mongoose.model('currency', currencySchema, config.DB_prefix+'ycnerruc')
