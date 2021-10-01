var express           = require('express');
var router            = express.Router();
let common            = require('../helpers/common');
var async             = require('async');
var mongoose          = require('mongoose');
var banner            = mongoose.model('banner');
var cms               = mongoose.model('cms');
var ObjectId          = mongoose.Types.ObjectId;

var Request           = require("request").defaults({ encoding: null });
const request         = require('request');

let apiresponse = {
    status: 200,
    message: "",
    data: [],
    cmscount: 0
};

// need code
router.get('/test', (req, res) => {
    console.log('okay')
    try {
        res.json({ status: true, success: "success123" });
    } catch (e) {
        console.log("getaddress", e)
    }
});

router.post('/getcms', common.originMiddleware, (req, res) => {
    try {
        values = req.body;
        cms.findOne({ "pagekey": values.pagekey }).exec(function (errs, resdatas) {
            if (resdatas.length > 0) {
                res.json({ status: false, message: "No data available !!!" })
            } else {
                res.json({ status: true, message: "cms data !!!",data:resdatas })
            }
        })
    } catch (e) {
        console.log("Referal Add error", e);
    }
});

router.get('/getbanner', common.originMiddleware, (req, res) => {
    try {
        banner.find({ "status": 0 }).exec(function (errs, resdatas) {
            if (resdatas.length > 0) {
                res.json({ status: true, message: "banner data !!!",data:resdatas })
            } else {
                res.json({ status: false, message: "No data available !!!",data:[] })
            }
        })
    } catch (e) {
        console.log("Referal Add error", e);
    }
});

module.exports = router;