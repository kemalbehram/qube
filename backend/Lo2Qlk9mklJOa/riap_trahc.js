var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var pairSchema = new Schema({
  // new variables
    "pair"           :{type:String,default:""},
    "fromCurrency"   :{type:String,default:"", useCreateIndex: true}, 
    "toCurrency"     :{type:String,default:"", useCreateIndex: true},
    "fromCurrency_i" :{type:String,default:""}, 
    "toCurrency_i"   :{type:String,default:""},
    "fromCurrency_address" :{type:String,default:""}, 
    "toCurrency_address"   :{type:String,default:""},
    "fromCurrency_type"   :{type:String,default:""},
    "toCurrency_type"   :{type:String,default:""},
    "fromCurrency_name" :{type:String,default:""}, 
    "toCurrency_name"   :{type:String,default:""},
    "fromCurrency_decimal" :{type:Number,default:18, useCreateIndex: true}, 
    "toCurrency_decimal"   :{type:Number,default:18, useCreateIndex: true},
    "pair_address"   :{type:String,default:"", useCreateIndex: true},
    "liqudity"          :{type:Number,default:0, useCreateIndex: true},
    "volume_24h"          :{type:Number,default:0, useCreateIndex: true},
    "volume_7d"          :{type:Number,default:0, useCreateIndex: true},
    "created_date"   : { type: Date, default: Date.now },
    "modified_date"  : { type: Date, default: Date.now }
  // new variables
});

module.exports = mongoose.model('chart_pair', pairSchema, config.DB_prefix+'riap_trahc')
