var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var pairSchema = new Schema({
  // new variables
    "currency"                : { type:String,default:"" , unique : true, useCreateIndex: true}, 
    "currency_i"              : { type:String,default:"" }, 
    "currency_name"           : { type:String,default:"" }, 
    "currency_type"           : { type:String,default:"" , useCreateIndex: true},
    "currency_address"        : { type:String,default:"" , useCreateIndex: true}, 
    "currency_liqudity"       : { type:Number,default:0 , useCreateIndex: true}, 
    "currency_liqudityHrs"    : { type:Number,default:0 , useCreateIndex: true}, 
    "currency_liqudityDays"    : { type:Number,default:0 , useCreateIndex: true}, 
    "currency_volume"         : { type:Number,default:0 }, 
    "currency_price"          : { type:Number,default:0 }, 
    "currency_price_change"   : { type:Number,default:0 , useCreateIndex: true}, 
    "currency_decimal"        : { type:Number,default:0 , useCreateIndex: true}, 
    "type"                    : { type:String,default:"" }, 
    "USDprice"                : { type:Number,default:0 , useCreateIndex: true}, 
    "created_date"            : { type: Date, default: Date.now },
    "modified_date"           : { type: Date, default: Date.now }
  // new variables
});

module.exports = mongoose.model('chart_token', pairSchema, config.DB_prefix+'nekot_trahc')
