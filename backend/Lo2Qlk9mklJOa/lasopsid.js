var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config   = require("../config/config");

var disposalSchema = new Schema({
    "emailid": { type: String, default: '' },
    "status": { type: String, default: 'Active' },
    "createddate": { type: Date, default: Date.now },
    "modifieddate": { type: Date, default: Date.now },
});
module.exports = mongoose.model('disposal', disposalSchema, config.DB_prefix+'lasopsid');