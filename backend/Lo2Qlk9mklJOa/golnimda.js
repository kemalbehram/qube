var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var userlogSchema = new Schema({
    "user_id":{ type: mongoose.Schema.Types.ObjectId, ref: 'admin', useCreateIndex: true},
    "browser":{type:String,default:""},
    "ip_address":{type:String,default:"", useCreateIndex: true},
    "createddate": { type: Date, default: Date.now }
});
module.exports = mongoose.model('adminlog', userlogSchema, config.DB_prefix+'golnimda')
