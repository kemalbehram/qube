var express       = require('express');
var router        = express.Router();

var cloudinary    = require('cloudinary');
var multer        = require('multer');
var async         = require('async');
var mongoose      = require('mongoose');
const rpc         = require('node-json-rpc2');
var Client        = require('node-rest-client').Client;
var WAValidator   = require('wallet-address-validator');
var round         = require('mongo-round');
var speakeasy     = require('speakeasy');
var qrcode        = require('qrcode');
var validator     = require('node-validator');
const path        = require('path');
const fs          = require('fs');

// only for cron functions
var cron          = require('node-cron');
// need
const Web3        = require('web3');
var Request       = require("request").defaults({ encoding: null });
const request     = require('request');

let common        = require('../helpers/common');
var mail          = require('../helpers/mailhelper');
var config        = require("../config/config");

var sitesettings  = mongoose.model('sitesetting');
var tokenHolders  = mongoose.model('tokenHolders');

var ObjectId      = mongoose.Types.ObjectId;

var oArray=[]


let contract_details = require("../config/contract.json");
let key_details = require("../config/VwemjWjdudlap.json");


let apiresponse = {
  status: 200,
  message: "",
  data: [],
  cmscount: 0
};

var directoryPath = path.join(__dirname);

// need code
  router.get('/test',(req,res)=>{
    try{
      res.json({ status:true,success:"success"});
    } catch(e) {
      console.log("getaddress",e)
    }
  });

  // check claim eligible
  router.post('/checkclaim', common.originMiddleware, (req, res) => {
    try{
      var datas = {},
      values    = req.body;
      if(typeof(values.useraddress)=="undefined" || values.useraddress=='' || values.useraddress == null){
        res.json({
          status:false,
          message:'Please try again later',
          err_msg:"checkclaim"
        })
      } else {
        let cnt = {"holderAddress":values.useraddress.toLowerCase(),"pendingBalanceUpdate":"No"};
        tokenHolders.find(cnt).exec(function(errs,resdatas){
          if(resdatas.length>0){
            let sam_cont = contract_details.sam_contract;
              request('https://ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress='+sam_cont+'&address='+values.useraddress+'&tag=latest', function (error, response, body) {
                // console.error('error:', error); // Print the error if one occurred
                let data = JSON.parse(body);
                let token_val  = data.result; // user sam token value
                if(token_val > 0){
                  var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/ace26df5eee341b3ab52f89fd7f56d49"));
                  let sam_bal = web3.utils.fromWei(token_val.toString(), 'ether');
                  sam_bal     = sam_bal * 4.5;
                  res.json({
                    status:true,
                    sam_bal:sam_bal,
                    message:'Request OK',
                  })
                } else {
                  res.json({
                    status:false,
                    sam_bal:0.0000,
                    message:'Not-Eligible !!! Your are not SAM Holder !',
                    err_msg:"not eligible"
                  })
                }
              });  
          }else{
            res.json({
              status:false,
              sam_bal:0.0000,
              message:'Not-Eligible For Airdrop',
              err_msg:"not eligible"
            })
          }
        })
      }
    } catch(e) {
      console.log("checkclaim function error",e);
    }
  });

  router.post('/claimfunction', common.originMiddleware, (req, res) => {
    try{
      var datas = {},
      values    = req.body;
      if(typeof(values.useraddress)=="undefined" || values.useraddress=='' || values.useraddress == null){
        res.json({
          status:false,
          message:'Please try again later',
          err_msg:"Need address"
        })
      } else {
        let sam_cont = contract_details.sam_contract;
          request('https://ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress='+sam_cont+'&address='+values.useraddress+'&tag=latest', function (error, response, body) {
            // console.error('error:', error); // Print the error if one occurred
            let data = JSON.parse(body);
            var date = new Date(); 
            var timestamp = date.getTime();
            
            let cliam_tok       = contract_details.airdrop_contract; // claim contract address
            let currentAccount  = values.useraddress; // user address 
            let erne_token_val  = data.result; // user sam token value
            let adding_time1    = timestamp+1000; // current time stamp + 1000

            var web3            = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/ace26df5eee341b3ab52f89fd7f56d49"));
            var sendhash        = web3.utils.soliditySha3(cliam_tok,currentAccount,erne_token_val,adding_time1);
            const mes           = sendhash;
            const privatekey    = "0x"+common.decrypt(key_details.claim_key);

            var sig   = web3.eth.accounts.sign(mes,privatekey);
            res.json({ status:true,success:"success",adding_time1:adding_time1,signature:sig.signature,data:values.useraddress});
          });
      }
    } catch(e) {
      console.log("claim function error",e);
    }
  });

  router.post('/update_claim', common.originMiddleware, (req, res) => {
    try{
      var datas = {},
      values    = req.body;
      if(typeof(values.holderAddress)=="undefined" || values.holderAddress=='' || values.holderAddress == null){
        res.json({
          status:false,
          message:'Please try again later',
          err_msg:"Need address"
        })
      } else {
        tokenHolders.findOneAndUpdate({"holderAddress":values.holderAddress.toLowerCase()},{"$set":{"pendingBalanceUpdate":"Yes","tx_id":values.tx_id}},{multi: true}).exec(function(errs,resdataa){
          res.json({ status:true,success:"success"});
        });
      }
    } catch(e) {
      console.log("claim function error",e);
    }
  });

// need code



 
  
  
//cron router function

cloudinary.config({
 cloud_name: '',
    api_key: '',
    api_secret: ''
  });
var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

module.exports = router;