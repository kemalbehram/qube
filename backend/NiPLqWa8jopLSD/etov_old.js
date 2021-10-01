var express = require('express');
var router = express.Router();
let common = require('../helpers/common');
var async = require('async');
var mongoose = require('mongoose');

var proposals = mongoose.model('proposals');
var votes = mongoose.model('votes');

var ObjectId = mongoose.Types.ObjectId;
var round = require('mongo-round');
var oArray = []
var validator = require('node-validator');
var cron = require('node-cron');
// need
const Web3 = require('web3');
// need
var Request = require("request").defaults({ encoding: null });
const request = require('request');
var contract_details = require("../config/contract");
const web3 = new Web3(new Web3.providers.HttpProvider(contract_details.provider));

let apiresponse = {
  status: 200,
  message: "",
  data: [],
  cmscount: 0
};

// need code atm
router.get('/test', (req, res) => {
  try {
    res.json({ status: true, success: "success123", cur_date: new Date(), ex_date: new Date(new Date().getTime() + 60 * 60 * 24 * 1000), cur_date_string: new Date().getTime(), ex_date_string: new Date(new Date().getTime() + 60 * 60 * 24 * 1000).getTime() });
  } catch (e) {
    console.log("test", e)
  }
});

// create section
router.post('/create_proposal', common.originMiddleware, (req, res) => {
  try {
    var datas = {},
      values = req.body;

    values.expired_date = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
    values.expired_date_stamp = new Date(values.expired_date).getTime();
    proposals.create(values, async function (err, resdata) {
      res.json({ status: true, message: "success", data: "Inserted successfully" });
    });
  } catch (e) {
    console.log("create_pool_log error", e);
  }
});
// create section

// user side 
router.get('/get_proposal', common.originMiddleware, (req, res) => {



  proposals.aggregate([
    {
      $lookup:
      {
        from: 'GLP_setov',
        localField: '_id',
        foreignField: 'propose_id',
        as: 'votes',
      },
    }
  ]).exec(function (err, resData) {
    if (err) return res.status(500).send(err);
    res.json({ status: true, data: resData });
  })


});
router.get('/get_proposalOld', common.originMiddleware, (req, res) => {
  // router.get('/get_proposal',async (req, res) => {
  try {
    // proposals.find({ "status": "Active" }).exec(function (errs, resdatas) {
    proposals.find().exec(async function (errs, resdatas) {
      let i = 1;
      let resultlength = resdatas.length;
      let results = [];
      if (resultlength > 0) {
        res.json({ status: true, data: resdatas });
      } else {
        res.json({ status: true, data: "Data not found ! " });
      }
      // need to work
      // await resdatas.forEach(async resdatass => {
      //   let resp        = {};
      //   resp            = resdatass;

      //   let test        = await getvotecount(resdatass._id);
      //   console.log("test ----->",test);

      //   // if( i == resultlength || resultlength < i ) {
      //   //   results.push(resp);
      //   //   console.log("in to if ---->");
      //   //   console.log("in to if i---->",i);
      //   //   // console.log("in to if resultlength---->",resultlength);
      //   //   // console.log("resdatas ---->",resdatas);
      //   //   res.json({ status: true, data: results });
      //   // } else {
      //   //   results.push(resp);
      //   //   console.log("in to else ---->");
      //   //   // console.log("resdatas.length ---->",resultlength);
      //   //   // console.log("i ---->",i);
      //   //   // console.log("resdatas ---->",results);
      //   // }
      //   i++;
      // });
      // need to work
    });
  } catch (e) {
    console.log("get_proposal error", e);
  }
});


// admin side need to work
router.post('/get_proposal', common.originMiddleware, (req, res) => {
  try {
    var datas = {},
      values = req.body;
    let useraddress = values.useraddress;
    proposals.find({ "status": "Active" }).exec(async function (errs, resdatas) {
      if (resdatas.length > 0) {
        res.json({ status: true, data: resdatas });



        // await resdatas.forEach(async resdatas => {
        // })
        // await getvotedetails(useraddress);
      } else {
        res.json({ status: false, data: resdatas })
      }
    });
  } catch (e) {
    console.log("getpairdetails error", e);
  }
});



// admin side 
// admin proposal list
router.post('/proposal_list', common.originMiddleware, (req, res) => {
  try {
    var skip = req.body.page.pageNumber * req.body.page.size;
    var limit = req.body.page.size;
    let prop1 = req.body.sorting.prop;

    var dir = req.body.sorting['dir'];
    var srt = {}
    srt[prop1] = dir == 'desc' ? -1 : 1;

    var cnt = {};
    var search = req.body.search;
    if (req.body.search != "") {
      cnt = { $or: [{ 'description': { $regex: '.*' + search + '.*', $options: 'i' } }, { 'user_address': { $regex: '.*' + search + '.*', $options: 'i' } }, { 'created_date': { $regex: '.*' + search + '.*', $options: 'i' } }] };
    }

    async.parallel({
      holdersTotalCount: function (cb) {
        proposals.find(cnt).countDocuments().exec(cb);
      },
      holdersData: function (cb) {
        proposals.find(cnt).limit(limit).skip(skip).sort(srt).lean().exec(cb);
      },
    }, async function (err, results) {
      if (err) return res.status(500).send(err);
      apiresponse.data = [];
      apiresponse.status = true;
      let totalData = results.holdersData;
      apiresponse.data = totalData;
      apiresponse.datacount = results.holdersTotalCount;
      apiresponse.message = "";
      res.json(apiresponse);
    })
  } catch (e) {
    console.log("proposal_list", e);
  }
});

// proposal details and voting details 
router.post('/proposal_details', common.originMiddleware, async (req, res) => {
  try {
    values = req.body;
    await votes.find({ "propose_id": mongoose.Types.ObjectId(values._id) }).exec(async function (errs, resdatas) {
      if (resdatas.length > 0) {
        res.json({ status: true, data: resdatas });
      } else {
        res.json({ status: true, data: "Data not found" });
      }
    });
  } catch (e) {
    console.log("proposal_details", e);
  }
});

// proposal details and voting details 
router.post('/proposal_Details', common.originMiddleware, async (req, res) => {
  try {
    values = req.body;
    let result_count = [];
    await votes.find({ "propose_id": mongoose.Types.ObjectId(values._id), "vote": true }).exec(async function (errs, possitveresdatas) {
      if (errs) {
        res.json({ status: false, data: "somthing went to wrong." });
      } else {
        result_count["possitive_count"] = possitveresdatas.length;
        await votes.find({ "propose_id": mongoose.Types.ObjectId(values._id), "vote": false }).exec(async function (errs, negativeresdatas) {
          if (errs) {
  // proposal details and voting details 
    // router.post('/proposal_Details', common.originMiddleware, async (req, res) => {
    router.post('/proposal_vote_count', async (req, res) => {
      try {
        values            = req.body;
        let result_count  = [];
        await votes.find({ "propose_id": mongoose.Types.ObjectId(values._id),"vote":true }).exec(async function (errs, possitveresdatas) {
          if(errs) {
            res.json({ status: false, data: "somthing went to wrong." });
          } else {
            result_count["negative_count"] = negativeresdatas.length;
            res.json({ status: true, data: result_count });
          }
        });
      }
    });
  } catch (e) {
    console.log("proposal_details", e);
  }
});

// status update for proposals
router.post('/update_proposal_status', common.originMiddleware, (req, res) => {
  try {
    let values = req.body;
    let status;
    if (req.body.status == true) {
      stauts = "Executed";
    } else {
      stauts = "Failed";
    }
    proposals.findOneAndUpdate({ "_id": req.body._id }, { "$set": { "status": stauts } }, { new: true }).exec(function (err, resData) {
      if (err) {
        res.status(500).send(errup);
      } else {
        apiresponse.data = [];
        apiresponse.data = resData;
        apiresponse.message = "Status has been updated successfully";
        res.json({ status: true, data: apiresponse });
      }
    });
  } catch (e) {
    console.log("proposal_details", e);
  }
});

router.post('/single_proposal', common.originMiddleware, (req, res) => {
  try {
    var datas = {},
      values = req.body;
    proposals.find({ "_id": mongoose.Types.ObjectId(values._id) }).exec(async function (errs, resdatas) {
      if (resdatas.length > 0) {
        res.json({ status: true, data: resdatas[0] });
      } else {
        res.json({ status: false, data: resdatas })
      }
    });
  } catch (e) {
    console.log("single_proposal error", e);
  }
});
// admin side 


async function getvotedetails(useraddress) {
  // votes
  await votes.find({ "user_address": "useraddress" }).exec(async function (errs, resdatas) {
    if (resdatas.length > 0) {
      res.json({ status: true, data: "Data not found" });
    } else {
      res.json({ status: true, data: resdatas });
    }
  });
}

// get vote count
async function getvotecount(_id) {
  // votes
  let result_count = [];
  await votes.find({ "propose_id": mongoose.Types.ObjectId(_id), "vote": true }).exec(async function (errs, possitveresdatas) {
    if (errs) {
      result_count["possitive_count"] = 0;
    } else {
      result_count["possitive_count"] = possitveresdatas.length;
      await votes.find({ "propose_id": mongoose.Types.ObjectId(_id), "vote": false }).exec(async function (errs, negativeresdatas) {
        if (errs) {
          result_count["negative_count"] = 0;
        } else {
          result_count["negative_count"] = negativeresdatas.length;
        }
        return result_count;
      });
    }
  });
}

// create vote
router.post('/create_vote', common.originMiddleware, (req, res) => {
  try {
    var datas = {},
      values = req.body;
    votes.create(values, async function (err, resdata) {
      res.json({ status: true, message: "success", data: "Inserted successfully" });
    });
  } catch (e) {
    console.log("create_pool_log error", e);
  }
});
// create vote


// check vote
router.post('/check_vote', common.originMiddleware, async (req, res) => {
  try {
    var datas = {},
      values = req.body;
    await votes.find({ "propose_id": values.propose_id, "user_address": values.user_address }).exec(async function (errs, resdatas) {
      if (resdatas.length > 0) {
        res.json({ status: false, data: "not_ok" });
      } else {
        res.json({ status: true, data: "ok" });
      }
    });
  } catch (e) {
    console.log("create_pool_log error", e);
  }
});
// check vote

router.post('/getsignature', common.originMiddleware, async (req, res) => {
  try {
    let datas = {},
      values = req.body;
    if (typeof (values.useraddress) == "undefined" || values.useraddress == '' || values.useraddress == null) {
      res.json({
        status: false,
        message: 'Please try again later',
        err_msg: "Need address"
      })
    } else {
      // new
      let tg_cont_add = values.tg_cont_add;
      let useraddress = values.useraddress;

      // let sign_key                = "0xacd83d7c8afe9508251cb8c4a8af2315c8e8368459be3ae7c65420eb6d1ed2d0";
      let sign_key = "0x" + common.decrypt(key_details.claim_key);
      let delegatee = values.useraddress;
      let date = new Date();
      let timestamp = date.getTime();
      let deadline = timestamp + 1000;

      let sendhash = await web3.utils.soliditySha3(tg_cont_add, values.useraddress, values.useraddress, deadline);
      let sig = await web3.eth.accounts.sign(sendhash, sign_key);
      let signature = sig.signature;
      await res.json({ status: true, success: "success", sign: signature, addess: values.useraddress });
      // new
    }
  } catch (e) {
    console.log("getsignature function error", e);
  }
});


// need code

module.exports = router;