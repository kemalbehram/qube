var express         = require('express');
var router          = express.Router();

var async           = require('async');
var mongoose        = require('mongoose');
const Web3          = require('web3');
var cron            = require('node-cron');

let common          = require('../helpers/common');
// abi details
let pairs_abi       = require('../file/pairs_abi.json');

var chart_token     = mongoose.model('chart_token');
var pool_log        = mongoose.model('pool_log');
var chart_liqudity  = mongoose.model('chart_liqudity');
var chart_volume    = mongoose.model('chart_volume');
var remove_pool = mongoose.model('remove_pool');
var exchange    = mongoose.model('exchange');
var pairs        = mongoose.model('pairs');
var currencyDB        = mongoose.model('currency');
let apiresponse = {
  status: 200,
  message: "",
  data: [],
  cmscount: 0
}


router.post('/userAcountData', common.originMiddleware, async function (req, res) {
    try {
      var skip    = (req.body.page.pageNumber-1) *  req.body.page.size;
      var limit   = req.body.page.size;
      let prop1   = req.body.sorting.prop;

      var dir     = req.body.sorting['dir'];
      var srt     = {}
      srt[prop1]  = dir == 'desc' ? -1 : 1;

      var cnt;

      var search  = req.body.search;
      
      if(search) {
        cnt = {
          $and:[{"remove_status":false},{$or:[{'fromCurrency': { $regex: '.*' + search + '.*',$options: 'i' }},{'toCurrency': { $regex: '.*' + search + '.*',$options: 'i' }},{'user_address': { $regex: '.*' + search + '.*',$options: 'i' }}]
        }]}
      } else {
        cnt       = {"remove_status":false};
      }
      async.parallel({
        swapCount:function(cb) {
          pool_log.aggregate([{$match:cnt},{$group:{"_id":{user_address:"$user_address",pair:"$pair"},liquditysum: { $sum: "$from_amount"}}}]).exec(cb)
        },
         SwapTotalData:function(cb) {
           pool_log.aggregate([{$match:cnt},{$lookup: {from : "QUB_par-LEPTlFE1pE",localField  : "pair",foreignField: "pair",as : "Records"
          }},{$group:{"_id": {user_address:"$user_address",pair:"$pair"},detail: { $first: '$$ROOT' },liquditysum: { $sum: "$from_amount"}}},{"$skip":skip},{$limit:limit},{$sort:srt}]).exec(cb)
        },
      },function(err,results){
        if (err) return res.status(500).send(err);
        apiresponse.data = [];
        apiresponse.status = true;
        apiresponse.data = results.SwapTotalData;
        apiresponse.currencycount = results.swapCount.length;
        apiresponse.message = "";
        res.json(apiresponse);
      })
    } catch(e) {
       console.log("userAcountData",e);
    }
  });

  //Transaction section

 router.post('/accountSwapData', common.originMiddleware, async function (req, res) {
    try {
      let apiresponse={};
      var skip    = (req.body.page.pageNumber-1) *  req.body.page.size;
      var limit   = req.body.page.size;
      let prop1   = req.body.sorting.prop;

      var dir     = req.body.sorting['dir'];
      var srt     = {}
      srt[prop1]  = dir == 'desc' ? -1 : 1;

      var cnt;

      var search  = req.body.search;
      var where={};

      if(req.body.userAddress){
       where= {"userAddress":{$regex: req.body.userAddress, $options: "i"}}
      }else if(req.body.pair){
        where= {"pair": req.body.pair}
      }else{
        where={}
      }
      if(search) {
        cnt = {$and:[where,{$or:[{'fromCurrency': { $regex: '.*' + search + '.*',$options: 'i' }},{'toCurrency': { $regex: '.*' + search + '.*',$options: 'i' }}]}]};
        // cnt = {{'$Records.pair': { $regex: '.*' + search + '.*',$options: 'i' }}
        
      } else {
        cnt       =where;
      }
      async.parallel({
        SwapTotalCount:function(cb) {
          exchange.aggregate([{$lookup: {from : "QUB_par-LEPTlFE1pE",localField  : "pair",foreignField: "pair",as : "Records"
          }},{"$match":cnt},{$count: "totalCount"}]).exec(cb);
        },
        SwapTotalData:function(cb) {
          exchange.aggregate([{$lookup: {from : "QUB_par-LEPTlFE1pE",localField  : "pair",foreignField: "pair",as : "Records"
          }},{"$match":cnt},{"$sort":srt},{"$skip":skip},{"$limit":limit}]).exec(cb);
        },
        Totalswapvalue:function(cb) {
          exchange.aggregate([{"$match":cnt},{$group:{_id:"$userAddress",swapsum: { $sum: "$from_amount"}}}]).exec(cb);
        },
      },function(err,results){
        if (err) return res.status(500).send(err);
        apiresponse.data = [];
        apiresponse.status = true;
        apiresponse.data = results.SwapTotalData;
        apiresponse.Totalswapvalue =0;
        apiresponse.swapcount = 0;
        if(results.Totalswapvalue.length>0){
           apiresponse.Totalswapvalue = results.Totalswapvalue[0].swapsum;
        }
        if(results.SwapTotalCount.length>0){
          apiresponse.swapcount = results.SwapTotalCount[0].totalCount;
        }
        apiresponse.message = "";
        res.json(apiresponse);
      })
    } catch(e) {
       console.log("accountSwapData",e);
    }
  });


  router.post('/accountAddData', common.originMiddleware, async function (req, res) {
    try {
      let apiresponse={};
      var skip    = (req.body.page.pageNumber-1) *  req.body.page.size;
      var limit   = req.body.page.size;
      let prop1   = req.body.sorting.prop;

      var dir     = req.body.sorting['dir'];
      var srt     = {}
      srt[prop1]  = dir == 'desc' ? -1 : 1;

      var cnt,db;
      var where={};
      var search  = req.body.search;
      if(req.body.user_address){
       where= {"user_address":{$regex: req.body.user_address, $options: "i"}}
      }else if(req.body.pair){
        where= {"pair": req.body.pair}
      }else{
        where={}
      }
      if(search) {
        cnt = {$and:[where,{$or:[{'fromCurrency': { $regex: '.*' + search + '.*',$options: 'i' }},{'toCurrency': { $regex: '.*' + search + '.*',$options: 'i' }}]}]};
        
      } else {
        cnt       = where;
      }
      async.parallel({
        SwapTotalCount:function(cb) {
          pool_log.find(cnt).countDocuments().exec(cb);
        },
        SwapTotalData:function(cb) {
          pool_log.find( cnt ).skip(skip).limit(limit).sort( srt ).exec(cb)
        },
      },function(err,results){
        if (err) return res.status(500).send(err);
        apiresponse.data = [];
        apiresponse.status = true;
        apiresponse.data = results.SwapTotalData;
        apiresponse.addcount = results.SwapTotalCount;
        apiresponse.message = "";
        res.json(apiresponse);
      })
    } catch(e) {
       console.log("accountAddData",e);
    }
  });

  router.post('/accountRemData', common.originMiddleware, async function (req, res) {
    try {
      let apiresponse={};
      var skip    = (req.body.page.pageNumber-1) *  req.body.page.size;
      var limit   = req.body.page.size;
      let prop1   = req.body.sorting.prop;

      var dir     = req.body.sorting['dir'];
      var srt     = {}
      srt[prop1]  = dir == 'desc' ? -1 : 1;
      var where={};
      var cnt,db;

      var search  = req.body.search;
      if(req.body.user_address){
        where= {"user_address":{$regex: req.body.user_address, $options: "i"}}
      }else if(req.body.pair){
        where= {"pair": req.body.pair}
      }else{
        where={}
      }
      if(search) {
        cnt = {$and:[where,{ $or:[{'fromCurrency': { $regex: '.*' + search + '.*',$options: 'i' }},{'toCurrency': { $regex: '.*' + search + '.*',$options: 'i' }}]}]};

      } else {
        cnt       = where;
      }
      async.parallel({
        SwapTotalCount:function(cb) {
          remove_pool.find(cnt).countDocuments().exec(cb);
        },
        SwapTotalData:function(cb) {
          remove_pool.find( cnt ).skip(skip).limit(limit).sort( srt ).exec(cb)
        },
      },function(err,results){
        if (err) return res.status(500).send(err);
        apiresponse.data = [];
        apiresponse.status = true;
        apiresponse.data = results.SwapTotalData;
        apiresponse.removecount = results.SwapTotalCount;
        apiresponse.message = "";
        res.json(apiresponse);
      })
    } catch(e) {
       console.log("accountRemData",e);
    }
  });

  router.post('/accountAllData', common.originMiddleware, async function (req, res) {
    try {
      let apiresponse={};
      var skip    = (req.body.page.pageNumber-1) *  req.body.page.size;
      var limit   = req.body.page.size;
      let prop1   = req.body.sorting.prop;

      var dir     = req.body.sorting['dir'];
      var srt     = {}
      srt[prop1]  = dir == 'desc' ? -1 : 1;

      var cnt,cnt1;

      var search  = req.body.search;
      var where={};
      var where1={};
      if(req.body.user_address){
        where= {"user_address":{$regex: req.body.user_address, $options: "i"}}
        where1= {"user_address":{$regex: req.body.user_address, $options: "i"}}
      }else if(req.body.pair){
        where= {"pair": req.body.pair}
        where1= {"pair": req.body.pair}
      }else{
        where={}
      }
      if(search) {
        cnt = {
          $and:[where,{ $or:[{'fromCurrency': { $regex: '.*' + search + '.*',$options: 'i' }},{'toCurrency': { $regex: '.*' + search + '.*',$options: 'i' }}]}]
        };

        cnt1= {
          $and:[where1,{ $or:[{'fromCurrency': { $regex: '.*' + search + '.*',$options: 'i' }},{'toCurrency': { $regex: '.*' + search + '.*',$options: 'i' }}]}]
        };
        
      } else {
        cnt1      = where;
        cnt       = where1;
      }
      async.parallel({
        swapCount:function(cb) {
          exchange.find(cnt1).sort({_id:-1}).exec(cb);
        },
        addCount:function(cb) {
          pool_log.find(cnt).sort({_id:-1}).exec(cb);
        },
        removeCount:function(cb) {
         remove_pool.find(cnt).sort({_id:-1}).exec(cb);
        },

      },function(err,results){
        let datadoc=results.swapCount;
        let dataval= datadoc.concat(results.addCount,results.removeCount);
        let mapDoc=dataval.sort(function(a,b){
          return new Date(b.created_date) - new Date(a.created_date);
        });
        let PageiAfter= mapDoc.slice(skip, skip+limit);
        if (err) return res.status(500).send(err);
        apiresponse.data = [];
        apiresponse.status = true;
        apiresponse.data = PageiAfter;
        apiresponse.currencycount = mapDoc.length;
        apiresponse.message = "";
        res.json(apiresponse);
      })
    } catch(e) {
       console.log("accountAllData",e);
    }
  });

  router.post('/getPairDept',async function(req,res){
    try{
      let pair=req.body.pair
      if(pair){
        pool_log.aggregate([{$match:{pair:pair,remove_status:false}},{$group:{"_id":"$pair" ,total: { $sum: "$from_amount"},to_total:{ $sum: "$to_amount"}}}]).exec(function(err,Rec){
          if(Rec.length>0){        
            res.json({status:true,data:Rec,message:"success"});
          }else{
            res.json({status:true,data:[],message:"success"});
          }
        })
      }else{
        res.json({status:false,message:"Not a valid pair"});
      }      
    }catch(e){
      console.log(e,'error in getPairDept')
    }
  });

   router.post('/getCoinDept',async function(req,res){
    try{
      let currency=req.body.currency
      if(currency){
        currencyDB.findOne({"currencySymbol":{$regex: currency, $options: "i"}}).exec(function(err,Rec){
          if(Rec){        
            res.json({status:true,data:Rec,message:"success"});
          }else{
            res.json({status:true,data:[],message:"success"});
          }
        })
      }else{
        res.json({status:false,message:"Not a valid pair"});
      }      
    }catch(e){
      console.log(e,'error in getCoinDept')
    }
  });



  //Transaction section

module.exports = router;