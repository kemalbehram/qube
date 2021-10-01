var express           = require('express');
var router            = express.Router();

var mongoose          = require('mongoose');
var cloudinary        = require('cloudinary');
var multer            = require('multer');
var async             = require('async');
var http              = require('http');
const fs              = require('fs')
const path            = require('path');
var cron              = require('node-cron');
var getJSON           = require('get-json');

let common            = require('../helpers/common');
var mail              = require('../helpers/mailhelper');
var config            = require("../config/config");

var deposit           = mongoose.model('deposit');
var harvest           = mongoose.model('harvest');
var remove_pool       = mongoose.model('remove_pool');
var admin             = mongoose.model('admin');
var emailtemplate     = mongoose.model('emailtemplate');
var sitesettings      = mongoose.model('sitesetting');
var currency          = mongoose.model('currency');
var cms               = mongoose.model('cms');
var pairs             = mongoose.model('pairs');
var withdraw          = mongoose.model('withdraw');
var static            = mongoose.model('static');
var ipblock           = mongoose.model('ipblock');
var disposal          = mongoose.model('disposal');
var faq               = mongoose.model('faq');
var referal           = mongoose.model('referal');

var ObjectId          = mongoose.Types.ObjectId;


// var socketio = require('socket.io');

let apiresponse = {
  status: 200,
  message: "",
  data: [],
  cmscount: 0
};
// cloudinary.config({
//   cloud_name: '',
//     api_key: '',
//     api_secret: ''
//   });
var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

function rounds(n) {
  var roundValue = (+n).toFixed(2)
  return parseFloat(roundValue)
}
function roundsETH(n) {
  var roundValue = (+n).toFixed(8)
  return parseFloat(roundValue)
}

////---------------------
// need 
  // login
    router.post('/admin_login', common.originMiddleware,(req,res)=>{
      try{
          var values          = req.body
          var encryptpass     = common.encrypt(req.body.password);
          let encryptedemail  = common.encrypt(values.emailid);
          
          // var random = Math.floor(100000 + Math.random() * 900000);
          var random          = 123456;
          admin.find({$and:[{"admin_emailid":encryptedemail},{"admin_password":encryptpass}]}).exec(function(err,resdata){
          
            if (err) return res.status(500).send(err);
            if(resdata.length>0){
              if(resdata[0].role=="admin"){
                if(resdata[0].tfastatus=="Active"){
                  datas = {
                     status  : true,
                     tfa     : true,
                     success : "You are logging in. Please Wait"
                  };
                  res.json(datas);
                }else{
                    if(resdata[0].otp_options==true){
                      admin.findOneAndUpdate({"_id":resdata[0]._id},{"$set":{"random_code":random}},{new: true}).exec(function(errs,rescreate){
                        sitesettings.find().exec(function(err_site,data_site){
                          var logo = data_site[0].site_logo;
                           var fb=data_site[0].facebook;
                            var insta=data_site[0].instagram;
                            var twitter=data_site[0].twitter;
                            var message = " Welcome to my home page";
                            emailtemplate.find({ "title": 'Admin OTP' }).exec(function(etemperr,etempdata){
                            var etempdataDynamic = etempdata[0].mailcontent.replace(/###TO###/g,values.emailid).replace(/###SUBJECT###/g,rescreate.random_code).replace(/###OTP###/g,rescreate.random_code).replace(/###LOGO###/g, logo).replace(/###twitter###/g,twitter).replace(/###insta###/g,insta).replace(/###fb###/g,fb);
                            if(resdata[0].admin_pattern == req.body.patternlock){
                             datas = {
                                     status  : true,
                                     // data    : resdata[0],
                                     otp_options    : resdata[0].otp_options,
                                     // session : origin,
                                     name    : resdata[0].admin_name,
                                     role    : resdata[0].role,
                                     // random_code:rescreate.random_code,
                                     random_code:"",
                                     success : "You are logging in. Please Wait"
                                  };
                            res.json(datas);
                            mail.sendMail('Admin OTP',{to:values.emailid, subject:'Re: '+random,text:message,html:etempdataDynamic},function(resp){});
                          } else {
                            datas ={
                              status : false,
                              error   : "Invalid Patternlock"
                            };
                            res.json(datas);
                          }

                          });
                        });
                      });
                    } else if(resdata[0].otp_options==false){
                       let origin = common.createPayload(resdata[0]._id);
                       if(resdata[0].admin_pattern == req.body.patternlock){
                           datas = {
                                   status  : true,
                                   // data    : resdata[0],
                                   otp_options    : resdata[0].otp_options,
                                   name    : resdata[0].admin_name,
                                   role    : resdata[0].role,
                                   session:origin,
                                   otp_options:false,
                                   success : "You are logging in. Please Wait"
                                };
                          res.json(datas);
                       } else {
                        datas ={
                              status : false,
                              error   : "Invalid Patternlock"
                            };
                            res.json(datas);
                       }
                    }
                }
              } else if(resdata[0].role=="subadmin") {
                if(resdata[0].status=="Active"){
                 if(resdata[0].otp_options==true){
                    admin.findOneAndUpdate({"_id":resdata[0]._id},{"$set":{"random_code":random}},{new: true}).exec(function(errs,rescreate){
                // let origin = common.createPayload(resdata[0]._id);
                sitesettings.find().select('site_logo').exec(function(err_site,data_site){
                  var logo = data_site[0].site_logo;
                     var fb=data_site[0].facebook;
                    var insta=data_site[0].instagram;
                    var twitter=data_site[0].twitter;
                    var message = " Welcome to my home page";
                    emailtemplate.find({ "title": 'Admin OTP' }).exec(function(etemperr,etempdata){
                    var etempdataDynamic = etempdata[0].mailcontent.replace(/###TO###/g,values.emailid).replace(/###SUBJECT###/g,rescreate.random_code).replace(/###OTP###/g,rescreate.random_code).replace(/###LOGO###/g, logo).replace(/###twitter###/g,twitter).replace(/###insta###/g,insta).replace(/###fb###/g,fb);
                    if(resdata[0].admin_pattern == req.body.patternlock){
                     datas = {
                             status  : true,
                             // data    : resdata[0],
                             otp_options    : resdata[0].otp_options,
                             // session : origin,
                             name    : resdata[0].admin_name,
                             role    : resdata[0].role,
                             random_code:rescreate.random_code,
                             success : "You are logging in. Please Wait"
                          };
                    res.json(datas);
                    mail.sendMail('Admin OTP',{to:values.emailid, subject:'Re: '+random,text:message,html:etempdataDynamic},function(resp){});
                  }
                else{
                  datas ={
                        status : false,
                        error   : "Invalid Patternlock"
                      };
                      res.json(datas);
                }

                  });
                });
                });
                  }
                else if(resdata[0].otp_options==false){
                  let origin = common.createPayload(resdata[0]._id);
                 if(resdata[0].admin_pattern == req.body.patternlock){
                     datas = {
                             status  : true,
                             // data    : resdata[0],
                             otp_options    : resdata[0].otp_options,
                             name    : resdata[0].admin_name,
                             role    : resdata[0].role,
                             session:origin,
                             otp_options:false,
                             success : "You are logging in. Please Wait"
                          };
                    res.json(datas);
                  }
                else{
                  datas ={
                        status : false,
                        error   : "Invalid Patternlock"
                      };
                      res.json(datas);
                }
                } 
                }
                else{
                   res.json({
                        status : false,
                        msg    : "Your Account has been deactivated by admin",
                        error : "Your Account has been deactivated by admin"
                      });
                }

              }
            } else {
              res.json({
                    status : false,
                    msg    : "no_mail",
                    error : "Invalid user"
                  });
            }
          })
        } catch(e) {
          console.log("admin_login",e)
        }
    });

    // forgot OTP
      router.post('/send_otp', common.originMiddleware,(req,res)=>{
        try{
            var values      = req.body
            let encryptedemail = common.encrypt(values.emailid);
            // var random = Math.floor(100000 + Math.random() * 900000);
            var random = 123456;
              admin.find({$and:[{"admin_emailid":encryptedemail}]}).exec(function(err,resdata){
              if (err) return res.status(500).send(err);
              if(resdata.length>0) {
                if(resdata[0].role=="admin"){
                  admin.findOneAndUpdate({"_id":resdata[0]._id},{"$set":{"random_code":random}},{new: true}).exec(function(errs,rescreate){
                    sitesettings.find().exec(function(err_site,data_site){
                      var logo = data_site[0].site_logo;
                      var fb=data_site[0].facebook;
                      var insta=data_site[0].instagram;
                      var twitter=data_site[0].twitter;
                      var message = " Welcome to my home page";
                      emailtemplate.find({ "title": 'Admin OTP' }).exec(function(etemperr,etempdata){
                        var etempdataDynamic = etempdata[0].mailcontent.replace(/###TO###/g,values.emailid).replace(/###SUBJECT###/g,rescreate.random_code).replace(/###OTP###/g,rescreate.random_code).replace(/###LOGO###/g, logo).replace(/###twitter###/g,twitter).replace(/###insta###/g,insta).replace(/###fb###/g,fb);
                          let message;
                          if(values.type=="password"){
                            message="Password has been send. Please Wait"
                          }else{
                            message="Pattern has been send. Please Wait"
                          }
                          datas = {
                            status  : true,
                            otp_options    : resdata[0].otp_options,
                            name    : resdata[0].admin_name,
                            role    : resdata[0].role,
                            random_code:"",
                            success : message
                          };
                          res.json(datas);
                          mail.sendMail('Admin OTP',{to:values.emailid, subject:'Re: '+random,text:message,html:etempdataDynamic},function(resp){});
                        
                      });
                    });
                  });
                } 
              } else {
                res.json({
                  status : false,
                  msg    : "no_mail",
                  error : "Invalid user"
                });
              }
            })
          } catch(e) {
            console.log("admin_login",e)
          }
      });


    // forgot OTP
  
    var adminloghis=mongoose.model('adminlog');
    router.post("/otpvalidate", common.originMiddleware,(req,res)=>{
      // old code for otp
        // admin.findOne({"admin_emailid":req.body.emailid}).exec(function(err,resdata){
        //   if(resdata.random_code==req.body.otp){
        //     // let origin = common.createPayload(resdata._id);
        //     let origin     = common.admin_createPayload(resdata._id);
        //     var date_for   = new Date();
        //     var date_data  = date_for.getTime();
        //     //log
        //       // var ip = req.connection.remoteAddress;
        //       let ip      = req.header('x-forwarded-for') || req.connection.remoteAddress;
        //       ip        = ip.replace('::ffff:', '');
        //       var arr=ip.split(':'); 
        //       var obj={
        //       "browser":"",
        //       // "ip_address":arr[3],
        //       "ip_address":ip,
        //       "user_id":resdata._id,
        //       }
        //        adminloghis.create(obj,function(err,resdata){
                 
        //        });
        //     //log
        //     res.json({status: true, data:resdata,session:origin,date:date_data});
        //   }
        //   else{
        //     res.json({status: false, error:"Invalid Otp"});
        //   }
        // })
      // old code for otp

      // new code for tfa
      let encryptedemail = common.encrypt(req.body.emailid)
        admin.findOne({"admin_emailid":encryptedemail}).exec(function(err,resdata){
          if(resdata.random_code==req.body.otp){
            // let origin = common.createPayload(resdata._id);
            let origin     = common.admin_createPayload(resdata._id);
            var date_for   = new Date();
            var date_data  = date_for.getTime();
            //log
              // var ip = req.connection.remoteAddress;
              let ip      = req.header('x-forwarded-for') || req.connection.remoteAddress;
              ip        = ip.replace('::ffff:', '');
              var arr=ip.split(':'); 
              var obj={
              "browser":"",
              // "ip_address":arr[3],
              "ip_address":ip,
              "user_id":resdata._id,
              }
              adminloghis.create(obj,function(err,resdata){
                 
              });
            //log
            // res.json({status: true, data:resdata,session:origin,date:date_data});
            res.json({status: true, data:{"role":"admin"},session:origin,date:date_data});
          } else { 
            res.json({status: false, error:"Invalid Otp"});
          }
        })
      // new code for tfa
    });

    router.post("/tfavalidate", common.originMiddleware,(req,res)=>{
      // new code for tfa
      let encryptedemail = common.encrypt(req.body.emailid)
        admin.findOne({"admin_emailid":encryptedemail}).exec(function(err,resdata){
          // if(resdata.random_code==req.body.otp){
          if(req.body.otp){
            var tfakey    = resdata.secret;
            var verified  = speakeasy.totp.verify({
                                                  secret  : tfakey.trim(),
                                                  encoding: 'base32',
                                                  token   : req.body.otp
                                                });
            var d         = new Date();
            var n         = d.getSeconds();
            if(verified == true){
                    // let origin = common.createPayload(resdata._id);
                    let origin     = common.admin_createPayload(resdata._id);
                    var date_for   = new Date();
                    var date_data  = date_for.getTime();
                    //log
                      // var ip = req.connection.remoteAddress;
                      let ip      = req.header('x-forwarded-for') || req.connection.remoteAddress;
                      ip        = ip.replace('::ffff:', '');
                      var arr=ip.split(':'); 
                      var obj={
                      "browser":"",
                      // "ip_address":arr[3],
                      "ip_address":ip,
                      "user_id":resdata._id,
                      }
                      adminloghis.create(obj,function(err,resdata){
                         
                      });
                    //log
                    // res.json({status: true, data:resdata,session:origin,date:date_data});
                    res.json({status: true, data:{"role":"admin"},session:origin,date:date_data});
            } else {
              res.json({ status: false, error: 'Invalid TFA code .' });
            }
          } else { 
            res.json({status: false, error:"Please enter TFA code. "});
          }
        })
      // new code for tfa
    });
  // login

  router.post('/adminprofilelist', common.originMiddleware,common.admintokenMiddleware, (req, res) => {
  admin.findOneAndUpdate({ "_id": req.userId },
    { "$set": {"admin_name": req.body.admin_name,
    "admin_image":req.body.admin_image,"otp_options":req.body.otp_options,
        "modifieddate": new Date()}},{multi: true}).
    exec(function(err, resUpdate){
       if(err) {
           res.status(500).send(err);
       } else {
           try {
             if (err) return res.status(500).send(err);
             apiresponse.data    = [];
             apiresponse.data    = resUpdate;
             apiresponse.message = "Basic Information Updated Successfully";
             res.json(apiresponse);
           } catch (err) {
              console.info("adminprofilelist", err)
           }
       }
    });
});

router.post('/changepassword', common.originMiddleware,common.admintokenMiddleware,(req,res)=>{
  try{
    admin.findOne({"_id":req.userId}).exec(function(err,resdata){
      var cupass=common.encrypt(req.body.currentpwd)
      var newencrypt=common.encrypt(req.body.newpwd)
      var confirmencrypt=common.encrypt(req.body.confirmpwd)
      if(resdata.admin_password!=cupass){
        res.json({"status": false,error:"You have entered the wrong current password"});
      }
      // else if(newencrypt!=confirmencrypt){
      // res.json({"status": true,error:"Your password does not match"});
      // }
      else{
        admin.findOneAndUpdate({"_id":req.userId},{"$set":{"admin_password":newencrypt}},{new:true}).exec(function(errup,resdataup){
          if(err) {
              res.status(500).send(err);
          } else {
            common.socket_emit("emit_achangepassword");
            apiresponse.data    = [];
            apiresponse.data    = resdataup;
            apiresponse.message = "Password Changed Successfully";
            res.json({status:true,data:apiresponse});
          }
        });
      }
    }); 
  } catch(e) {
    console.log("changepassword",e)
  }
});

//
router.post('/tfaupdate', common.originMiddleware,common.admintokenMiddleware,(req,res)=>{
  try{
    var verified = speakeasy.totp.verify({
    secret  : req.body.secret,
    encoding: 'base32',
    token   : req.body.tfacode,
    window  : 4
    });
    
    if(verified){
      admin.findOneAndUpdate({ "_id": req.userId },{ "$set": { "tfastatus": "Active",
      "secret": req.body.secret}},{multi: true}).exec(function(err,resData){
        if(err) {
          res.status(500).send(errup);
        } else {
          apiresponse.data    = [];
          apiresponse.data    = resData;
          apiresponse.message = "TFA Enabled Successfully";
          res.json({status:true,data:apiresponse});
        }
      });
    } else {
      apiresponse.data    = [];
      apiresponse.message = "Invalid TFA";
      res.json({status:false,data:apiresponse});
    }
  } catch(e) {
    console.log("changepassword",e)
  }
});
//

router.post('/sitesettingupdate',common.admintokenMiddleware,(req,res)=>{
  try{
    if(req.body.page=="site"){
      sitesettings.findOneAndUpdate({},
      {"$set":{"site_maintaince":req.body.site_maintaince,
      "maintance_detail":req.body.maintance_detail}}).exec(function(err,resupData){
        if(err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          io.emit('site_maintainence',{data:req.body});
          res.json({status: true, data:resupData});
        }
      });
    } else if(req.body.page=="social") {
      sitesettings.findOneAndUpdate({},{"$set":{"address":req.body.address,"mail":req.body.mail,"skype":req.body.skype,"phone":req.body.phone,"facebook":req.body.facebook,"youtube":req.body.youtube,"twitter":req.body.twitter,"instagram":req.body.instagram,"videolink":req.body.videolink,"vote_percentage":req.body.vote_percentage,"referal_percentage":req.body.referal_percentage}},{new:true}).exec(function(errss,resdata){
        if(errss) {
             console.log(errss);
             res.status(500).send(errss);
        } else {
          res.json({status: true, data:resdata});
        }
      });
    }else if(req.body.page=="pattern") {
      admin.findOneAndUpdate({},{"$set":{admin_pattern:req.body.patternlock}}).exec(function(errss,resdata){
        if(errss) {
             console.log(errss);
             res.status(500).send(errss);
        } else {
          res.json({status: true, data:resdata});
        }
      });
    } else {
      sitesettings.findOneAndUpdate({},
      {"$set":{"site_logo":req.body.site_logo,
      "site_favicon":req.body.site_favicon,"site_innerlogo":req.body.site_innerlogo,"site_name":req.body.site_name,"copyrights":req.body.copyrights}},{new: true}).exec(function(err,resupData){
        if(err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.json({status: true, data:resupData});
        }
      });
    }
  } catch(e) {
    console.log("sitesettingupdate",e)
  }
});

router.get('/siteinform', common.originMiddleware ,(req,res)=>{
  try{
    sitesettings.findOne().exec(function(err,resdata){
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.json({status: true, data:resdata});
      }
    })
  } catch(e) {
    console.log("sitesettingupdate",e)
  }
});

router.get('/video', common.originMiddleware,(req,res)=>{
  try {
    sitesettings.findOne().exec(function(err,resdata){
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.json({status: true, data:resdata.videolink});
      }
    })
  } catch(e) { 
    console.log("sitesettingupdate",e)
  }
});

var qrcode = require('qrcode');
var speakeasy = require('speakeasy');

  router.get('/adminDetails', common.originMiddleware,common.admintokenMiddleware,(req,res)=>{
      try{
        var where={"_id":req.userId}
        var gets={admin_name:1,admin_emailid:1,admin_image:1,otp_options:1,otp_options:1,tfastatus:1,_id:0}
        admin.findOne(where,gets).exec(function(err,resdta){
         if (err) return res.status(500).send(err);
            //
              if (resdta.tfastatus == "Deactive" || typeof(resdta.tfastatus) == "undefined") {
                // get tfa data 
                var mail = resdta.admin_emailid;
                var secret = speakeasy.generateSecret({
                  length: 10,
                  name: "Qube_admin:"+ common.decrypt(resdta.admin_emailid)
                });
                
                qrcode.toDataURL(secret.otpauth_url, function (err, image_data) {
                  if (image_data) {
                    var base64 = image_data;
                    var token = speakeasy.totp({
                      secret: secret.base32,
                      encoding: 'base32'
                    });
                    var secret1 = secret.base32;
                    var url = base64;
                    var onecode = token;
                    resdta.secret = secret1;
                    // resdta.tfaurl  = secret.otpauth_url;
                    resdta.tfaurl  = url;
                    // console.log("tfa url ---->", secret.otpauth_url);
                    resdta.admin_emailid = common.decrypt(resdta.admin_emailid);
                    res.json({ status: true, data: resdta });
                  } 
                });
              } else {
                resdta.admin_emailid = common.decrypt(resdta.admin_emailid);
                resdta.tfaurl =  '';
                res.json({ status: true, data: resdta });
              }
            //
        });
      } catch(e) {
       console.log("adminDetails",e)
      }
  });

  // router.post("/uploadPhoto",upload.array("uploads[]", 12), function (req, res) {
  //   if(req.files.length > 0){
  //     cloudinary.uploader.upload(req.files[0].path, function(result) {
  //       res.json({"status": true,"result":result});
  //     });
  //   }
  //   else{
  //      res.json({"status": false});
  //   }
  // });

  // router.post("/uploadimage", upload.array("uploads[]", 12), function (req, res) {
  //   try{
  //       if (req.files.length > 0) {
  //           var uploadLength = 0;
  //           let data = [];
  //           var totLength = req.files.length;
  //           for (var i = 0; i < req.files.length; i++) {
  //               cloudinary.uploader.upload(req.files[i].path, function (result) {
  //                   data[uploadLength] = result.original_filename + ',' + result.secure_url;
  //                   uploadLength = uploadLength + 1;
  //                   if (totLength == uploadLength) {
  //                         res.json({ "status": true, value: data });

  //                   }
  //               });
  //           }
  //       }
  //       else {
  //           res.json({ "status": false, Message: "Please upload valid file!" });
  //       }
  //   }
  //   catch(e){
  //     console.log("uploadPhoto",e);
  //   }
  // });

  // sub admin
    router.post('/listSubAdmin', common.originMiddleware,common.admintokenMiddleware, (req, res) => {
      try{
      var skip = req.body.page.pageNumber *  req.body.page.size;
      var limit = req.body.page.size;
      let prop1= req.body.sorting.prop;

      var dir= req.body.sorting['dir'];
      var srt = {}
      srt[prop1] = dir == 'desc' ? -1 : 1;

      var cnt;
      var search = req.body.search;
      if(req.body.search != ""){
        cnt = {$or:[{'admin_name': { $regex: '.*' + search + '.*',$options: 'i' }},{'admin_emailid': { $regex: '.*' + search + '.*',$options: 'i' }},{'status': { $regex: '.*' + search + '.*',$options: 'i' }}]};
      }
      else{
        cnt = {"role":"subadmin"};
      }
       async.parallel({
        subAdminTotalCount:function(cb) {
          admin.find(cnt).countDocuments().exec(cb);
        },
        subAdminData:function(cb) {
        admin.find( cnt ).limit(limit).skip(skip).sort( srt ).exec(cb)

           },
        },function(err,results){
            if (err) return res.status(500).send(err);
            apiresponse.data = [];
            apiresponse.status = true;
            apiresponse.data = results.subAdminData;
            apiresponse.subadmincount = results.subAdminTotalCount;
            apiresponse.message = "";
            res.json(apiresponse);
        })
     }
     catch(e){
       console.log("listSubAdmin",e);
     }
    });

  // cms 
    router.post('/cmslist',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      try{
      var skip = req.body.page.pageNumber *  req.body.page.size;
      var limit = req.body.page.size;
      let prop1= req.body.sorting.prop;

      var dir= req.body.sorting['dir'];
      var srt = {}
      srt[prop1] = dir == 'desc' ? -1 : 1;

      var cnt;
      var search = req.body.search;
      if(req.body.search != ""){
        cnt = {$or:[{'title': { $regex: '.*' + search + '.*',$options: 'i' }}]};
      }
      else{
        cnt = {};
      }
       async.parallel({
        currencyTotalCount:function(cb) {
          cms.find(cnt).countDocuments().exec(cb);
        },
        currencyData:function(cb) {
        cms.find( cnt ).limit(limit).skip(skip).sort( srt ).exec(cb)

           },
        },function(err,results){
            if (err) return res.status(500).send(err);
            apiresponse.data = [];
            apiresponse.status = true;
            apiresponse.data = results.currencyData;
            apiresponse.currencycount = results.currencyTotalCount;
            apiresponse.message = "";
            res.json(apiresponse);
        })
     }
     catch(e){
       console.log("currencylist",e);
     }
    });

    router.post('/getcms', common.originMiddleware,async function(req,res){
      try{
        // let cmsData = await cms.find({});
        // if(cmsData && cmsData.length > 0){
        //   res.json({status:true,data:cmsData});
        // }else{
        //   res.json({status:false,msg:'Unable to get data'})
        // }
        values = req.body;
        cms.findOne({ "pagekey": values.pagekey }).exec(function (errs, resdatas) {
            if (resdatas.length > 0) {
                res.json({ status: false, message: "No data available !!!" })
            } else {
                res.json({ status: true, message: "cms data !!!",data:resdatas })
            }
        })
      }catch(e){
        console.log(e,'error in getting cms')
      }
    });

    
    router.post('/editcms',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      // cms.findOneAndUpdate({ "_id": req.body._id },
      //   { "$set": 
      //   { "title": req.body.title,
      //     "pagecontent": req.body.pagecontent,
      //     "modifieddate": new Date()}},{multi: true}).
      //   exec(function(err, resUpdate){
      cms.findOneAndUpdate({ "_id": req.body._id },
        { "$set": 
        { "pagecontent": req.body.pagecontent,
          "modifieddate": new Date()}},{multi: true}).
        exec(function(err, resUpdate){
          try
          {
             if(err) {
                 res.status(500).send(err);
             } else {
               cms.find({ "_id": req.body._id }).exec(function(err,resData){
                 if (err) return res.status(500).send(err);
                 apiresponse.data = [];
                 apiresponse.data = resData;
                 apiresponse.message = "Email Template Updated Successfully";
                 res.json(apiresponse);
               });
             }
          }
          catch (err)
          {
             console.info("emailtemplist", err)
          }
        });
    });
  // cms 

  // forgot password
    router.post('/forgetPwdAdmin', common.originMiddleware, (req, res) => {
      try {
        var datas           = {},
        values              = req.body.emailid;
        var dtime           = req.body.datetime;
        let encryptedemail  = common.encrypt(req.body.emailid);
        let otp             = req.body.otp;
        let where           = {"admin_emailid":encryptedemail,"random_code":otp};
        admin.find(where).exec(function(err,resData){
         if(resData.length >0) {
              if(resData[0].role=="admin"){
                  emailtemplate.find({ "title": 'forget password admin' }).exec(function(etemperr,etempdata){
                    var len = etempdata.length;
                      sitesettings.find().select('site_logo').exec(function(err_site,data_site){
                        var logo = data_site[0].site_logo;
                        var fb=data_site[0].facebook;
                        var insta=data_site[0].instagram;
                        var twitter=data_site[0].twitter;
                        var current_date = (new Date()).valueOf().toString();
                        // var encyptid=common.encrypt(resData[0]._id.toString())
                        let Adminvalues=resData[0]._id
                        var encyptid=common.encrypt(Adminvalues.toString())
                        // var decrypt=common.decrypt(encyptid)
                        // var clientHost = req.get('origin')+'/';
                        // var clientHost = req.get('origin')+'/';
                        var clientHost = common.ulink();
                        // link=clientHost+'#'+'/'+"reset-new?dfd="+encyptid+'&ee='+dtime;
                        link=clientHost+'#'+'/'+"reset-new?dfd="+encyptid+'&ee='+dtime;
                        var etempdataDynamic = etempdata[0].mailcontent.replace(/###LINK###/g, link).replace(/###LOGO###/g, logo).replace(/###twitter###/g,twitter).replace(/###insta###/g,insta).replace(/###fb###/g,fb);
                        mail.sendMail('forgetPwdAdmin',{to:values,id:resData[0]._id,html:etempdataDynamic},function(mailRes){
                            res.json({ status : true , success    : "success",});
                        })
                      });
                  });
              } else {
                  emailtemplate.find({ "title": 'forget password admin' }).exec(function(etemperr,etempdata){
                      var len = etempdata.length;
                      sitesettings.find().select('site_logo').exec(function(err_site,data_site){
                        var logo = data_site[0].site_logo;
                        var fb=data_site[0].facebook;
                        var insta=data_site[0].instagram;
                        var twitter=data_site[0].twitter;
                        var current_date = (new Date()).valueOf().toString();
                        // var encyptid=common.encrypt(resData[0]._id.toString())
                        let Adminvalues=resData[0]._id
                        var encyptid=common.encrypt(Adminvalues.toString())
                        // var decrypt=common.decrypt(encyptid)
                        // var clientHost = req.get('origin')+'/';
                        // var clientHost = req.get('origin')+'/';
                        var clientHost = common.ulink();
                        // link=clientHost+'#'+'/'+"reset-new?dfd="+encyptid+'&ee='+dtime;
                        link=clientHost+'#'+'/'+"reset-new?dfd="+encyptid+'&ee='+dtime;
                        var etempdataDynamic = etempdata[0].mailcontent.replace(/###LINK###/g, link).replace(/###LOGO###/g, logo).replace(/###twitter###/g,twitter).replace(/###insta###/g,insta).replace(/###fb###/g,fb);
                        mail.sendMail('forgetPwdAdmin',{to:values,id:resData[0]._id,html:etempdataDynamic},function(mailRes){
                            res.json({ status : true , success    : "success",});
                        })
                      });
                  });
              }
         } else {
            res.json({
              status:false,
              message:'Email id does not belong to our website'
            })
         }
        });
      } catch(e) {
        console.log("forgetpassword",e);
      }
    });

    router.post('/forgetPtrnAdmin', common.originMiddleware, (req, res) => {
      try {
        var datas           = {},
        values              = req.body.emailid;
        var dtime           = req.body.datetime;
        let encryptedemail  = common.encrypt(req.body.emailid);
        let otp             = req.body.otp;
        let where           = {"admin_emailid":encryptedemail,"random_code":otp};
        admin.find(where).exec(function(err,resData){
         if(resData.length >0) {
              if(resData[0].role=="admin"){
                  emailtemplate.find({ "title": 'forget pattern admin' }).exec(function(etemperr,etempdata){
                    var len = etempdata.length;
                      sitesettings.find().select('site_logo').exec(function(err_site,data_site){
                        var logo = data_site[0].site_logo;
                        var fb=data_site[0].facebook;
                        var insta=data_site[0].instagram;
                        var twitter=data_site[0].twitter;
                        var current_date = (new Date()).valueOf().toString();
                        // var encyptid=common.encrypt(resData[0]._id.toString())
                        let Adminvalues=resData[0]._id
                        var encyptid=common.encrypt(Adminvalues.toString())
                        // var decrypt=common.decrypt(encyptid)
                        // var clientHost = req.get('origin')+'/';
                        // var clientHost = req.get('origin')+'/';
                        var clientHost = common.ulink();
                        // link=clientHost+'#'+'/'+"reset-new?dfd="+encyptid+'&ee='+dtime;
                        link=clientHost+'#'+'/'+"pattern-new?dfd="+encyptid+'&ee='+dtime;
                        var etempdataDynamic = etempdata[0].mailcontent.replace(/###LINK###/g, link).replace(/###LOGO###/g, logo).replace(/###twitter###/g,twitter).replace(/###insta###/g,insta).replace(/###fb###/g,fb);
                        mail.sendMail('forgetPtrnAdmin',{to:values,id:resData[0]._id,html:etempdataDynamic},function(mailRes){
                            res.json({ status : true , success    : "success",});
                        })
                      });
                  });
              } else {
                  emailtemplate.find({ "title": 'forget pattern admin' }).exec(function(etemperr,etempdata){
                      var len = etempdata.length;
                      sitesettings.find().select('site_logo').exec(function(err_site,data_site){
                        var logo = data_site[0].site_logo;
                        var fb=data_site[0].facebook;
                        var insta=data_site[0].instagram;
                        var twitter=data_site[0].twitter;
                        var current_date = (new Date()).valueOf().toString();
                        // var encyptid=common.encrypt(resData[0]._id.toString())
                        var encyptid=common.encrypt(resData[0]._id)
                        // var decrypt=common.decrypt(encyptid)
                        // var clientHost = req.get('origin')+'/';
                        // var clientHost = req.get('origin')+'/';
                        var clientHost = common.ulink();
                        // link=clientHost+'#'+'/'+"reset-new?dfd="+encyptid+'&ee='+dtime;
                        link=clientHost+'#'+'/'+"pattern-new?dfd="+encyptid+'&ee='+dtime;
                        var etempdataDynamic = etempdata[0].mailcontent.replace(/###LINK###/g, link).replace(/###LOGO###/g, logo).replace(/###twitter###/g,twitter).replace(/###insta###/g,insta).replace(/###fb###/g,fb);
                        mail.sendMail('forgetPtrnAdmin',{to:values,id:resData[0]._id,html:etempdataDynamic},function(mailRes){
                            res.json({ status : true , success    : "success",});
                        })
                      });
                  });
              }
         } else {
            res.json({
              status:false,
              message:'Email id does not belong to our website'
            })
         }
        });
      } catch(e) {
        console.log("forgetpassword",e);
      }
    });


    router.post('/reset_newpwd', common.originMiddleware, (req, res) => {
      try{
        var datas = {},
        values = req.body;
        
        pass=common.decrypt(values.session)
        if(req.body.type == 'loggeduser'){
          user.find({"_id":pass}).exec(function(err,resData){
            if(resData.length == 0) {
              res.json({
                status : false,
                errMsg : 'Invalid request'
              });
            }
            else {
              if(resData[0].status == 1) {
                res.json({
                  status : false,
                  errMsg : 'Your account have been de-activated. Contact admin for more details.'
                });
              }
              else if(resData[0].admin_password != common.encrypt(values.password)) {
                res.json({
                  status : false,
                  errMsg : 'You have entered wrong old password'
                });
              }
              else{
                admin.findOneAndUpdate({ "_id": pass },
                  { "$set": {"admin_password": common.encrypt(values.password),"resetlink":0,"modifieddate": new Date()}},{multi: true}).
                  exec(function(err, resUpdate){
                  if(err) {
                    res.json({
                      status : false,
                      errMsg : 'We have encountered a problem while processing your request'
                    })
                  }
                  else {
                    res.json({ status : true })
                
                  }
                })
              }
            }
          })
        }
        else{
            console.log("values --------->", values);
            console.log("session --------->", values.session);
            console.log("forgot pass pass --------->", common.decrypt(values.session));
          // admin.find({"_id":new ObjectId(pass)}).exec(function(err,resData){
          admin.find({"_id":mongoose.Types.ObjectId(pass)}).exec(function(err,resData){
            console.log("forgot pass err --------->", err);
            console.log("forgot pass result --------->", resData);
            // return false
            if(resData.length == 0) {
              res.json({
                status : false,
                errMsg : 'Invalid request'
              });
            }
            else {
              if(resData[0].status == 1) {
                res.json({
                  status : false,
                  errMsg : 'Your account have been de-activated. Contact admin for more details.'
                });
              }
              else if(resData[0].admin_password == common.encrypt(values.password)) {
                res.json({
                  status : false,
                  errMsg : 'You have entered same old password'
                });
              }
              else{
                // admin.findOneAndUpdate({ "_id": pass },
                admin.findOneAndUpdate({ "_id": pass },
                  { "$set": {"admin_password": common.encrypt(values.password),"resetlink":0,"modifieddate": new Date()}},{multi: true}).
                  exec(function(err, resUpdate){
                  if(err) {
                    res.json({
                      status : false,
                      errMsg : 'We have encountered a problem while processing your request'
                    })
                  }
                  else {
                    res.json({ status : true })
                  
                  }
                })
              }
            }
          })
        }
      }
      catch(e){
        console.log("reset_pwd",e);
      }
    });



    router.post('/reset_newptrn', common.originMiddleware, (req, res) => {
      try{
        var datas = {},
        values = req.body;
        
        if(values.type == 'resetuser'){
          pass=common.decrypt(values.session)
          admin.find({"_id":pass}).exec(function(err,resData){
            console.log(resData,values.session,pass,values)
            if(resData.length == 0) {
              res.json({status : false,errMsg : 'Invalid request'});
            }else {
              if(resData[0].status == 1) {
                res.json({status : false,errMsg : 'Your account have been de-activated. Contact admin for more details.'});
              }else if(resData[0].admin_pattern == common.encrypt(values.pattern)) {
                res.json({status : false,errMsg : 'You have entered old Pattern,Please choose another pattern'});
              }else{
                admin.findOneAndUpdate({ "_id": pass },
                  { "$set": {"admin_pattern": values.pattern,"resetlink":0,"modifieddate": new Date()}},{multi: true}).
                  exec(function(err, resUpdate){
                  if(err) {
                    console.log(err)
                    res.json({status : false,errMsg : 'We have encountered a problem while processing your request'})
                  }
                  else {
                    res.json({ status : true })
                
                  }
                })
              }
            }
          })
        }else{
          res.json({status : false,errMsg : 'Invalid request'});
        }
      }
      catch(e){
        console.log("reset_pwd",e);
      }
    });
  // forgot password

  // staic page section

    router.post('/staticlist',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      try{
      var skip = req.body.page.pageNumber *  req.body.page.size;
      var limit = req.body.page.size;
      let prop1= req.body.sorting.prop;

      var dir= req.body.sorting['dir'];
      var srt = {}
      srt[prop1] = dir == 'desc' ? -1 : 1;

      var cnt;
      var search = req.body.search;
      if(req.body.search != ""){
        cnt = {$or:[{'title': { $regex: '.*' + search + '.*',$options: 'i' }}]};
      }
      else{
        cnt = {};
      }
       async.parallel({
        currencyTotalCount:function(cb) {
          static.find(cnt).countDocuments().exec(cb);
        },
        currencyData:function(cb) {
        static.find( cnt ).limit(limit).skip(skip).sort( srt ).exec(cb)

           },
        },function(err,results){
            if (err) return res.status(500).send(err);
            apiresponse.data = [];
            apiresponse.status = true;
            apiresponse.data = results.currencyData;
            apiresponse.currencycount = results.currencyTotalCount;
            apiresponse.message = "";
            res.json(apiresponse);
        })
     }
     catch(e){
       console.log("staticlist",e);
     }
    });

    router.post('/editstatic',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      static.findOneAndUpdate({ "_id": req.body._id },
        { "$set": 
        { "title": req.body.title,
          "content_title":req.body.content_title,
          "pagecontent": req.body.pagecontent,
          "sub_title":req.body.sub_title,
          "image":req.body.image,
          "imagesec":req.body.imagesec,
          "modifieddate": new Date()}},{multi: true}).
        exec(function(err, resUpdate){
          try
          {
             if(err) {
                 res.status(500).send(err);
             } else {
               static.find({ "_id": req.body._id }).exec(function(err,resData){
                 if (err) return res.status(500).send(err);
                 apiresponse.data = [];
                 apiresponse.data = resData;
                 apiresponse.message = "Static content Updated Successfully";
                 res.json(apiresponse);
               });
             }
          }
          catch (err)
          {
             console.info("emailtemplist", err)
          }
        });
    });

    router.get('/gethomedetails', common.originMiddleware ,(req,res)=>{
    static.find({"pagekey":"home"}).exec(function(err,resdata){
    res.json({ status:true, data:resdata})
    });
    });

    router.get('/getaboutdetails', common.originMiddleware ,(req,res)=>{
    static.find({"pagekey":"about"}).exec(function(err,resdata){
    res.json({ status:true, data:resdata})
    });
    });

    router.get('/getfooterdetails', common.originMiddleware ,(req,res)=>{
    static.find({"pagekey":"footer"}).exec(function(err,resdata){
    res.json({ status:true, data:resdata})
    });
    });

  // staic page section

  // email template
    router.post('/emailtemplatelist',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      try{
      var skip = req.body.page.pageNumber *  req.body.page.size;
      var limit = req.body.page.size;
      let prop1= req.body.sorting.prop;

      var dir= req.body.sorting['dir'];
      var srt = {}
      srt[prop1] = dir == 'desc' ? -1 : 1;

      var cnt;
      var search = req.body.search;
      if(req.body.search != ""){
        cnt = {$or:[{'title': { $regex: '.*' + search + '.*',$options: 'i' }},{'mailsubject': { $regex: '.*' + search + '.*',$options: 'i' }}]};
      }
      else{
        cnt = {};
      }
       async.parallel({
        currencyTotalCount:function(cb) {
          emailtemplate.find(cnt).countDocuments().exec(cb);
        },
        currencyData:function(cb) {
        emailtemplate.find( cnt ).limit(limit).skip(skip).sort( srt ).exec(cb)

           },
        },function(err,results){
            if (err) return res.status(500).send(err);
            apiresponse.data = [];
            apiresponse.status = true;
            apiresponse.data = results.currencyData;
            apiresponse.currencycount = results.currencyTotalCount;
            apiresponse.message = "";
            res.json(apiresponse);
        })
     }
     catch(e){
       console.log("emailtemplatelist",e);
     }
    });
    router.post('/emailtemplist',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      emailtemplate.findOneAndUpdate({ "_id": req.body._id },{ "$set": { "title": req.body.title, "mailsubject": req.body.mailsubject,
         "mailcontent": req.body.mailcontent,"modifieddate": new Date()}},{multi: true}).
        exec(function(err, resUpdate){
          try
          {
             if(err) {
                 console.log(err);
                 res.status(500).send(err);
             } else {
               emailtemplate.find({ "_id": req.body._id }).exec(function(err,resData){
                 if (err) return res.status(500).send(err);
                 apiresponse.data = [];
                 apiresponse.data = resData;
                 apiresponse.message = "Email Template Updated Successfully";
                 res.json(apiresponse);
               });
             }
          }
          catch (err)
          {
             console.info("emailtemplist", err)
          }
        });
    });
  // email template
  


// need 
var upload = multer({ storage: storage,limits: {fileSize: 100000000} });
////---------------------


// need 
  
// need 


//image upload

//basic info


// common.digitset("",4)


router.get('/getsocialdetails', common.originMiddleware,(req,res)=>{
  sitesettings.find().exec(function(err,resData){
  res.json({status:true,data:resData})
  });
});


var oArray=[]

router.get('/getterms', common.originMiddleware,(req,res)=>{
static.find({$and:[{"title":"global_terms"},{"sub_title":"Termsuse"}]}).exec(function(err,resdata){
res.json({ status:true, data:resdata})
});
});

router.get('/getkyc', common.originMiddleware,(req,res)=>{
static.find({$and:[{"title":"global_terms"},{"sub_title":"privacy"}]}).exec(function(err,resdata){
res.json({ status:true, data:resdata})
});
});

router.get('/getprivacy', common.originMiddleware,(req,res)=>{
static.find({$and:[{"title":"global_terms"},{"sub_title":"privacy"}]}).exec(function(err,resdata){
res.json({ status:true, data:resdata})
});
});
router.get('/getcookie', common.originMiddleware,(req,res)=>{
static.find({$and:[{"title":"global_terms"},{"sub_title":"cookie"}]}).exec(function(err,resdata){
res.json({ status:true, data:resdata})
});
});

router.get('/getnewterms', common.originMiddleware, common.originMiddleware,(req,res)=>{
static.find({$and:[{"title":"news_terms"},{"sub_title":"Termsuse"}]}).exec(function(err,resdata){
res.json({ status:true, data:resdata})
});
});

router.get('/getnewkyc', common.originMiddleware,(req,res)=>{
static.find({$and:[{"title":"news_terms"},{"sub_title":"Termskyc"}]}).exec(function(err,resdata){
res.json({ status:true, data:resdata})
});
});

router.get('/getnewprivacy',(req,res)=>{
static.find({$and:[{"title":"news_terms"},{"sub_title":"Termsprivacy"}]}).exec(function(err,resdata){
res.json({ status:true, data:resdata})
});
});
router.get('/getnewcookie', common.originMiddleware,(req,res)=>{
static.find({$and:[{"title":"news_terms"},{"sub_title":"Termscookie"}]}).exec(function(err,resdata){
res.json({ status:true, data:resdata})
});
});



// for count 
var exchange     = mongoose.model('exchange');
var pool_log     = mongoose.model('pool_log');
// for count 


router.get('/getdashboarddetails_admin',common.admintokenMiddleware , common.originMiddleware, (req, res) => {
  try {
    async.parallel({
      exchangecount : function(cb) {
        exchange.find().countDocuments().exec(cb);
      },
      pairscount : function(cb) {
        pairs.find().countDocuments().exec(cb);
      },
      poolcount : function(cb) {
        pool_log.find().countDocuments().exec(cb);
      },
      claimcount : function(cb) {
        harvest.find().countDocuments().exec(cb);
      },
      removepoolcount : function(cb) {
       remove_pool.find().countDocuments().exec(cb);
      },
      adminlogcount : function(cb) {
        adminloghis.find().countDocuments().exec(cb);
      },
      depositcount : function(cb) {
        deposit.find().countDocuments().exec(cb);
      },
      withdrawcount : function(cb) {
        withdraw.find().countDocuments().exec(cb);
      },
    },(err,results) => {
      var resobj = {
        "exchangecount": results.exchangecount,
        "pairscount":results.pairscount,
        "poolcount":results.poolcount, 
        "adminlogcount":results.adminlogcount, 
        "removepoolcount":results.removepoolcount,
        "claimcount":results.claimcount ,
        "withdrawcount":results.withdrawcount,
        "depositcount":results.depositcount

      };
      apiresponse.data    = [];
      apiresponse.data    = resobj;
      apiresponse.message = "";
      res.json(apiresponse);
    })
  }
  catch (err) {
    console.log("getdashboarddetails_admin", err);
  }

});

router.post('/updateuserstatustfa',common.admintokenMiddleware , common.originMiddleware, (req, res) => {
   user.findOneAndUpdate({ "_id": req.body._id },
    { "$set": {"tfaenable": req.body.tfaenable,"tfaenablekey": ''}},{multi: true}).
    exec(function(err, resUpdate){
       if(err) {
           res.status(500).send(err);
       } else {
         user.find({ "_id": req.body._id }).exec(function(err,resData){
           try
           {
             if (err) return res.status(500).send(err);
             apiresponse.data    = [];
             // apiresponse.data    = resData;
             apiresponse.data    = "";
             apiresponse.message = "User Status Updated Successfully";
             res.json(apiresponse);
           }
           catch (err)
           {
            console.log("updateuserstatustfa", err)
           }
         });
       }
    });
});


router.post('/userlistexport',common.admintokenMiddleware , common.originMiddleware, (req, res) => {
  try{

    var cnt;
    var search = req.body.search;
    if(req.body.search != ""){
        if(search.toLowerCase()=='Active'){
              cnt = {'status':1}
            }
             else if(search.toLowerCase()=='Deactive') {
              cnt = {'status':0}
            }
            else{
            cnt = {$or:[{'username': { $regex: '.*' + search + '.*',$options: 'i' }},{'emailid': { $regex: '.*' + search + '.*',$options: 'i' }}]};

            }

   
        filter = parseFloat(search);
                 if(filter >= 0){
                cnt['$or'].push({'receive_amount': { $eq: parseFloat(filter)}},{'total_amount':{$eq:parseFloat(filter)}},{'price':{$eq:parseFloat(filter)}},{'fees':{$eq: parseFloat(filter)}});
                 } 
    }

    else{
      cnt = {};
    }
     
      user.aggregate([
   
      {
        $project:{
          "username":"$username",
          "emailid":"$emailid",
          "created_date":{$dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$createddate" }},
           "status":"$status",
           "Deposit_otp":"$Deposit_otp",
           "withdraw_otp":"$withdraw_otp",
            "tfaenable":"$tfaenable"
        }
      },
              {$match: cnt}
              ]).exec(function(err,resData){
                if (err) return res.status(500).send(err);
                  res.send({status: true, data:resData});
              })
}
catch(e){
  console.log("exchangeexport",e);
}
});


router.post('/withdrawexport',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
  try{

    var cnt;
    var search = req.body.search;
    if(req.body.search != ""){
      cnt = {$or:[{'username': { $regex: '.*' + search + '.*',$options: 'i' }},{'emailid': { $regex: '.*' + search + '.*',$options: 'i' }},{'pairs': { $regex: '.*' + search + '.*',$options: 'i' }},{'oder_type': { $regex: '.*' + search + '.*',$options: 'i' }}]};
   
        filter = parseFloat(search);
         if(filter >= 0){
            cnt['$or'].push({'receive_amount': { $eq: parseFloat(filter)}},{'total_amount':{$eq:parseFloat(filter)}},{'price':{$eq:parseFloat(filter)}},{'fees':{$eq: parseFloat(filter)}});
                 } 
    }

    else{
      cnt = {"currencytype":"fiat"};
    }
     
      withdraw.aggregate([
      {
        $lookup: {
          from        : "users",
          localField  : "user_id",
          foreignField: "_id",
          as          : "username"
          },

      },
       {
        $lookup: {
          from        : "GMX_ycnerruc",
          localField  : "currencyid",
          foreignField: "_id",
          as          : "currencynamess"
          },

      },
      {
        $project:{
          "username":"$username.username",
          "currencyname":"$currency_name",
          "emailid":"$username.emailid",
          "fromcurrency":"$fromcurrency",
          "tocurrency_name":"$tocurrency_name",
          "amount":"$amount",
          "receive_amount":"$receive_amount",
          "fees":"$fees",
          "status":"$status",
          "oder_type":"$oder_type",
          "created_date":"$created_date",
          "totalamount":"$total_amount",
          "user_id":"$user_id",
          "currencyid":"$currencynamess._id",
          "currencytype":"$currencytype"

        }
      },
              {$match: cnt}
              ]).exec(function(err,resData){
                if (err) return res.status(500).send(err);
                  res.send({status: true, data:resData});
              })
}
catch(e){
  console.log("exchangeexport",e);
}
});
router.post('/sendexport',common.admintokenMiddleware , common.originMiddleware, (req, res) => {
  try{

    var cnt;
    var search = req.body.search;
    if(req.body.search != ""){
      cnt = {$or:[{'username': { $regex: '.*' + search + '.*',$options: 'i' }},{'emailid': { $regex: '.*' + search + '.*',$options: 'i' }},{'pairs': { $regex: '.*' + search + '.*',$options: 'i' }},{'oder_type': { $regex: '.*' + search + '.*',$options: 'i' }}]};
   
        filter = parseFloat(search);
         if(filter >= 0){
            cnt['$or'].push({'receive_amount': { $eq: parseFloat(filter)}},{'total_amount':{$eq:parseFloat(filter)}},{'price':{$eq:parseFloat(filter)}},{'fees':{$eq: parseFloat(filter)}});
                 } 
    }

    else{
      cnt = {"currencytype":"crypto"};
    }
   withdraw.aggregate([
      {
        $lookup: {
          from        : "users",
          localField  : "user_id",
          foreignField: "_id",
          as          : "username"
          },

      },
       {
        $lookup: {
          from        : "GMX_ycnerruc",
          localField  : "currencyid",
          foreignField: "_id",
          as          : "currencyname"
          },

      },
      {
        $project:{
          "username":"$username.username",
          "currencyname":"$currency_name",
          "emailid":"$username.emailid",
          "fromcurrency":"$fromcurrency",
          "tocurrency_name":"$tocurrency_name",
          "amount":"$amount",
          "receive_amount":"$receive_amount",
          "fees":"$fees",
          "status":"$status",
          "oder_type":"$oder_type",
          "created_date":"$created_date",
          "totalamount":"$total_amount",
          "user_id":"$user_id",
          "currencyid":"$currencyname._id",
          "currencytype":"$currencytype"

        }
      },
     
              {$match: cnt}
              ]).exec(function(err,resData){
                if (err) return res.status(500).send(err);
                  res.send({status: true, data:resData});
              })
}
catch(e){
  console.log("sendexport",e);
}
});


// admin log history
router.post('/adminloginhistory',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
  try{
    var skip    = req.body.page.pageNumber *  req.body.page.size;
    var limit   = req.body.page.size;
    let prop1   = req.body.sorting.prop;

    var dir     = req.body.sorting['dir'];
    var srt     = {}
    srt[prop1]  = dir == 'desc' ? -1 : 1;

    var cnt;
    var search  = req.body.search;
    if(req.body.search != ""){
      cnt = {$or:[{'username': { $regex: '.*' + search + '.*',$options: 'i' }},{'emailid': { $regex: '.*' + search + '.*',$options: 'i' }},{'browser': { $regex: '.*' + search + '.*',$options: 'i' }}]};
    } else {
      cnt = {};
    }
     async.parallel({
      currencyTotalCount:function(cb) {
        adminloghis.aggregate([
        {
          $lookup: {
            from        : "Avs_nimda",
            localField  : "user_id",
            foreignField: "_id",
            as          : "username"
            },

        },
        {
          $project:{
            "username":"$username.admin_name",
            "emailid":"$username.admin_emailid",
            "ip_address":"$ip_address",
            // "browser":"$browser",
            "createddate":"$createddate"

            
          }
        },
        { $match:cnt},
        ]).exec(cb)
      },
      currencyData:function(cb) {
        adminloghis.aggregate([
        {
          $lookup: {
            from        : "Avs_nimda",
            localField  : "user_id",
            foreignField: "_id",
            as          : "username"
            },
        },
        {
          $project:{
            "username":"$username.admin_name",
            "emailid":"$username.admin_emailid",
            "ip_address":"$ip_address",
            // "browser":"$browser",
            "createddate":"$createddate"
          }
        },
        { $match:cnt},
        { "$sort": srt },
        { "$skip": skip },
        { "$limit": limit },
        ]).exec(cb)
       },
      },function(err,results){
        if (err) return res.status(500).send(err);
          apiresponse.data = [];
          apiresponse.status = true;
          apiresponse.data = results.currencyData;
          apiresponse.currencycount = results.currencyTotalCount.length;
          apiresponse.message = "";
          for(let i=0; i<apiresponse.data.length; i++){
            apiresponse.data[i].emailid[0] = common.decrypt(apiresponse.data[i].emailid[0])
          }
          res.json(apiresponse);
      })
 } catch(e) {
   console.log("admin loginhistory",e);
 }
});
// admin log history

router.post('/chkipaddress', common.originMiddleware , (req, res) => {
  // console.log("in to check ip address ---->");
  var resp = req.body;
  var ipvalue=req.header('x-forwarded-for') || req.connection.remoteAddress.replace("::ffff:", "")
  var data={
    "user_ip":ipvalue,
    "status":1
  }
  console.log("ipvalue ------>",ipvalue);
  //  old code start here
    ipblock.find({"user_ip":ipvalue}).exec(function(errrr,resdataip){
      if(resdataip.length>0){
      } else {
            ipblock.create(data,function(res){});

      }
    })
    ipblock.find({"user_ip": ipvalue,"status":0 }).exec(function(err,resData){ 
      if (err) return res.status(500).send(err);
      if(resData.length > 0){
        if(resData[0].status == 0){
          apiresponse.status = false;
          apiresponse.data = [{"status":1}];
          apiresponse.message = "Your Ip Address has been blocked";
          res.json(apiresponse);
        }
        else{
          apiresponse.data = [{"status":1}];
          apiresponse.status = true;
          apiresponse.message = "";
          res.json(apiresponse);
        }
      } else {
     
        apiresponse.data = [{"status":1}];
        apiresponse.status = true;
        apiresponse.message = "";
       
        res.json(apiresponse);
      } 
    });
});

router.post('/chkip', common.originMiddleware, (req, res) => {
  var resp = req.body;
  var ipvalue=req.header('x-forwarded-for') || req.connection.remoteAddress.replace("::ffff:", "")
      res.json({mss:ipvalue})
});

router.post('/IPblockhistory',common.admintokenMiddleware , common.originMiddleware, (req, res) => {
  try{

  var skip = req.body.page.pageNumber *  req.body.page.size;
  var limit = req.body.page.size;
  let prop1= req.body.sorting.prop;

  var dir= req.body.sorting['dir'];
  var srt = {}
  srt[prop1] = dir == 'desc' ? -1 : 1;

  var cnt;
  var search = req.body.search;
  if(req.body.search != ""){
    cnt = {$or:[{'emailid': { $regex: '.*' + search + '.*',$options: 'i' }}]};
     filter = parseFloat(search);
         if(filter >= 0){
            cnt['$or'].push({'user_ip': { $eq: parseFloat(filter)}},{'status':{$eq:parseFloat(filter)}});
                 } 
  }
  else{
    cnt = {};
  }
   async.parallel({
    currencyTotalCount:function(cb) {
      ipblock.find(cnt).countDocuments().exec(cb);
    },
    currencyData:function(cb) {
    ipblock.find( cnt ).limit(limit).skip(skip).sort( srt ).exec(cb)

       },
    },function(err,results){
        if (err) return res.status(500).send(err);
        apiresponse.data = [];
        apiresponse.status = true;
        apiresponse.data = results.currencyData;
        apiresponse.currencycount = results.currencyTotalCount;
        apiresponse.message = "";
        res.json(apiresponse);
    })
 }
 catch(e){
   console.log("coldwallethistory",e);
 }
});
router.post('/ipstatus',common.admintokenMiddleware, common.originMiddleware, (req,res) => {
try{
  ipblock.findOneAndUpdate({ "_id": req.body._id },{ "$set": { "status": req.body.status,
      "modifieddate": new Date()}},{multi: true}).exec(async function(err,resData){
        let ipDetails = await ipblock.findOne({_id:req.body._id}).lean();
        io.emit('blockip',{status:req.body.status, ip:ipDetails.user_ip});
        res.json({ status:true, data:resData})
}); 
}
catch(e){
  console.log("ipstatus",e)
}  
});

router.post('/deleteip',common.admintokenMiddleware, common.originMiddleware, async(req,res) => {
try{
  let ipDetails = await ipblock.findOne({_id:req.body._id}).lean();
  ipblock.deleteOne({ "_id": req.body._id }).exec(async function(err,resData){
    io.emit('blockip',{status:1, ip:ipDetails.user_ip});
    res.json({ status:true, msg:"Deleted Successfully"})
  }); 
}
catch(e){
  console.log("ipstatus",e)
}  
});

router.post('/addIpToBlock', common.admintokenMiddleware, common.originMiddleware, async(req, res)=>{
  try{
    let reqData = req.body;
    let ipExists = await ipblock.findOne({user_ip:reqData.user_ip}).lean();
    if(!ipExists){
      let addIp = await ipblock.create(reqData);
      io.emit('blockip',{status:1, ip:reqData.user_ip});
      res.json({status:true, msg:'Created Successfully'});
    }else{
      res.json({status:false, msg:'Ip already Exists'});
    }
  }catch(e){
    console.log(e,'addIp')
  }
})

router.post('/get_single_ip',common.admintokenMiddleware, common.originMiddleware, async(req,res) => {
  try{
    let ipDetails = await ipblock.findOne({_id:req.body._id}).lean();
    res.json({ status:true, msg:"Deleted Successfully",data:ipDetails})
  }
  catch(e){
    console.log("ipstatus",e)
  }  
});


router.post('/saveemaillist',common.admintokenMiddleware, common.originMiddleware,(req,res)=>{
try{
disposal.find({"emailid":req.body.emailid}).exec(function(errs,resdatas){
  if(resdatas.length==0){
    disposal.create(req.body,function(err,resdata){
    res.json({status:true,message:'Domain Added'}) 
    })  
  }
  else {
    res.json({status:false,message:'Already Added'}) 
  }
 
})

}
catch(e){
  console.log("saveemaillist",e);
}
});

router.post('/Domainhistory',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
  try{

  var skip = req.body.page.pageNumber *  req.body.page.size;
  var limit = req.body.page.size;
  let prop1= req.body.sorting.prop;

  var dir= req.body.sorting['dir'];
  var srt = {}
  srt[prop1] = dir == 'desc' ? -1 : 1;

  var cnt;
  var search = req.body.search;
  if(req.body.search != ""){
    cnt = {$or:[{'emailid': { $regex: '.*' + search + '.*',$options: 'i' }},{'status': { $regex: '.*' + search + '.*',$options: 'i' }}]};
  }
  else{
    cnt = {};
  }
   async.parallel({
    currencyTotalCount:function(cb) {
      disposal.find(cnt).countDocuments().exec(cb);
    },
    currencyData:function(cb) {
    disposal.find( cnt ).limit(limit).skip(skip).sort( srt ).exec(cb)

       },
    },function(err,results){
        if (err) return res.status(500).send(err);
        apiresponse.data = [];
        apiresponse.status = true;
        apiresponse.data = results.currencyData;
        apiresponse.currencycount = results.currencyTotalCount;
        apiresponse.message = "";
        res.json(apiresponse);
    })
 }
 catch(e){
   console.log("coldwallethistory",e);
 }
});

router.post('/disposalemail',common.admintokenMiddleware, common.originMiddleware, (req,res) => {
try{
  disposal.findOneAndUpdate({ "_id": req.body._id },{ "$set": { "status": req.body.status,
      "modifieddate": new Date()}},{multi: true}).exec(function(err,resData){
        res.json({ status:true, data:resData})
}); 
}
catch(e){
  console.log("ipstatus",e)
}  
});

function intervalFunc(orderwith) {
  var index = oArray.indexOf(orderwith);
  if (index > -1) {
    oArray.splice(index, 1);
  }
}

// for 

//List pairs
router.post('/pairslist', common.originMiddleware , async function(req,res){
  try{
    var skip = req.body.page.pageNumber *  req.body.page.size;
    var limit = req.body.page.size;
    let prop1= req.body.sorting.prop;

    var dir= req.body.sorting['dir'];
    var srt = {}
    srt[prop1] = dir == 'desc' ? -1 : 1;

    var cnt = {};
    var search = req.body.search;
    if(req.body.search != ""){
      cnt = {$or:[{'pair_address': { $regex: '.*' + search + '.*',$options: 'i' }},{'pair': { $regex: '.*' + search + '.*',$options: 'i' }},{'status': { $regex: '.*' + search + '.*',$options: 'i' }}]};
    }

     async.parallel({
      pairsTotalCount:function(cb) {
        pairs.find(cnt).countDocuments().exec(cb);
      },
      pairsData:function(cb) {
      pairs.find( cnt ).limit(limit).skip(skip).sort( srt ).exec(cb)

         },
      },function(err,results){
          if (err) return res.status(500).send(err);
          apiresponse.data = [];
          apiresponse.status = true;
          apiresponse.data = results.pairsData;
          apiresponse.pairscount = results.pairsTotalCount;
          apiresponse.message = "";
          res.json(apiresponse);
      })
   }
   catch(e){
     console.log("listSubAdmin",e);
   }
});

// insert pair
router.post('/createpair', common.originMiddleware , async function(req,res){
  try {
    let values  = req.body;

    let pair  = values.fromCurrency+"_"+values.toCurrency;

    pairs.find({"pair":pair }).exec(function(err,resData){
      if(resData.length > 0) {
        res.json({ status:true , msg:"already added"});
      } else {
        var obj     = {
          "pair"                 : values.fromCurrency+"_"+values.toCurrency,
          "fromCurrency"         : values.fromCurrency,
          "toCurrency"           : values.toCurrency,
          "fromCurrency_i"       : values.fromCurrency_img,
          "toCurrency_i"         : values.toCurrency_img,
          "fromCurrency_address" : values.fromCurrency_address,
          "toCurrency_address"   : values.toCurrency_address,
          "fromCurrency_type"    : values.fromCurrency_type,
          "toCurrency_type"      : values.toCurrency_type,
          "fromCurrency_name"    : values.fromCurrencyname,
          "toCurrency_name"      : values.toCurrencyname,
          "fromCurrency_decimal" : values.fromCurrency_decimal,
          "toCurrency_decimal"   : values.toCurrency_decimal,
          "created_by"           : values.created_by,
          "created_by_address"   : values.created_by_address,
        }
        pairs.create(obj,function(err,resdata){
          if (err) return res.status(500).send(err);
          res.json({ status:true, msg:"inserted"});
        });
      }
    });
  } catch(e) {
    console.log("createpair",e);
  }
});

router.get('/getPrivatekeyStatus', async function(req,res){
  try{
    let keyStatus = await admin.findOne({}).lean();
    var file 		= path.join(__dirname, '../config/VwemjWjdudlap.json');
    fs.readFile(file, "utf8", function(err, data) {
      console.log(data,'dddddddddd')
    })
    res.json({status:true,data:keyStatus});
  }catch(e){
    console.log(e,'erorinprivatekey')
  }
});

router.post('/importPrivKey', async function(req,res){
  try{
    let data = req.body;
    let updateKey = await common.encrypt(data.key);
    const key = {
      "claim_key":updateKey
    }
    var file 		= path.join(__dirname, '../config/VwemjWjdudlap.json');
    const jsonString = JSON.stringify(key);
    fs.writeFile(file, jsonString, async function(err, data) {
      if (err) {
          console.log('Error writing file', err)
      } else {
        let updateKeyStatus = await admin.update({},{$set:{adminPrivatekey_status:true}}).lean();
        console.log('Successfully wrote file')
        res.json({status:true,msg:'Key updated Successfully'});
      }
    })
  }catch(e){
    console.log(e,'erorinprivatekey')
  }
})

// cherry section
  var cherry_list = mongoose.model('cherry_list');
  // list cherry 
    router.post('/cherrylist', common.originMiddleware , async function(req,res){
      try {
        var skip    = req.body.page.pageNumber *  req.body.page.size;
        var limit   = req.body.page.size;
        let prop1   = req.body.sorting.prop;

        var dir     = req.body.sorting['dir'];
        var srt     = {}
        srt[prop1]  = dir == 'desc' ? -1 : 1;

        var cnt     = {};
        var search  = req.body.search;
        if(req.body.search != "") {
          cnt = {$or:[{'pair': { $regex: '.*' + search + '.*',$options: 'i' }},{'total_value': { $regex: '.*' + search + '.*',$options: 'i' }},{'status': { $regex: '.*' + search + '.*',$options: 'i' }}]};
        }

        async.parallel({
          pairsTotalCount:function(cb) {
            cherry_list.find(cnt).countDocuments().exec(cb);
          },
          pairsData:function(cb) {
            cherry_list.find( cnt ).limit(limit).skip(skip).sort( srt ).exec(cb)
          },
        },function(err,results){
          if (err) return res.status(500).send(err);
          apiresponse.data        = [];
          apiresponse.status      = true;
          apiresponse.data        = results.pairsData;
          apiresponse.cherrycount  = results.pairsTotalCount;
          apiresponse.message     = "";
          res.json(apiresponse);
        })
      } catch(e) {
        console.log("cherrylist",e);
      }
    });

  // check the cheer list
    router.post('/check_cherry', common.originMiddleware , async function(req,res){
      try {
        let values  = req.body;
          var where = {"pair":values.pair}
          // var gets={admin_name:1,admin_emailid:1,admin_image:1,otp_options:1,otp_options:1,tfastatus:1,_id:0}
          cherry_list.find(where).exec(function(err,resdta){  
            if(err) {
              res.status(500).send(errup);
            } else {
              if( resdta.length > 0 ) {
                console.log("into if ---->",resdta.length);
                res.json({status:false,msg:"already inserted"});
              } else {
                console.log("into else ---->",resdta.length);
                res.json({status:true,msg:"not inserted"});
              }
            }
          });
      } catch(e) {
        console.log("check_cherry ----->",e);
      }
    });


  // insert the cherrylisting
    router.post('/insert_cherry', common.originMiddleware , async function(req,res){
      try {
        let values  = req.body;
        console.log("values    ---->",values);
            var obj     = {
              "pair"                :values.pair,
              "pair_address"        :values.pair_address,
              "fromCurrency"        :values.fromCurrency,
              "toCurrency"          :values.toCurrency,
              "fromCurrency_address":values.fromCurrency_address,
              "toCurrency_address"  :values.toCurrency_address,
              "fromCurrency_type"   :values.fromCurrency_type,
              "toCurrency_type"     :values.toCurrency_type,
              "from_date"           :values.start_date,
              "to_date"             :values.end_date,
              "total_value"         :values.total_supply,
              "tx_id"               :values.txhash,
              "rewardedaddress"     :values.rewardedaddresss,
              "reward_token_contract"     :values.reward_token_contract,
              "type"                :values.type,
              "poolId"              :values.poolId,
            }
            console.log("obj    ---->",obj);
            return;
            cherry_list.create(obj,function(err,resdata){
              if (err) return res.status(500).send(err);
              if(values.type == "pair"){
                // let updatedPair = await pairs.update({pair:values.pair},{$set:{contract_add_status:true, poolId:values.poolId, pooltx_id:values.txhash}});
                
              }else{
                // let updatedPair = await currency.update({currencySymbol:values.pair},{$set:{contract_add_status:true, poolId:values.poolId, pooltx_id:values.txhash}});
              }
              res.json({ status:true})
            });
      } catch(e) {
        console.log("insert_cherry",e);
      }
    });

  // eligible chery pairs

    router.post('/get_eligible_cry_pairs', common.originMiddleware , async function(req,res){
      try {
        pairs.find({ "pair_status": "Active" }).exec(function(err,resData){
          if (err) return res.status(500).send(err);
          // apiresponse.data      = [];
          apiresponse.data      = resData;
          apiresponse.message   = "Eligible pair list";
          res.json(apiresponse);
        });
      } catch(e) {
        console.log("get_eligible_cry_pairs",e);
      }
    });

    router.post('/select_pair_details', common.originMiddleware , async function(req,res){
      try {
        let pair = req.body.pair;
        pairs.find({ "pair": pair }).exec(function(err,resData){
          if (err) return res.status(500).send(err);
          // apiresponse.data      = [];
          apiresponse.data      = resData;
          apiresponse.message   = "Eligible pair list";
          res.json(apiresponse);
        });
      } catch(e) {
        console.log("select_pair_details",e);
      }
    });
// cherry section

// faq section

  // list faq 
    router.post('/faqlist', common.admintokenMiddleware , common.originMiddleware , async function(req,res){
      try {
        var skip    = req.body.page.pageNumber *  req.body.page.size;
        var limit   = req.body.page.size;
        let prop1   = req.body.sorting.prop;

        var dir     = req.body.sorting['dir'];
        var srt     = {}
        srt[prop1]  = dir == 'desc' ? -1 : 1;

        var cnt     = {};
        var search  = req.body.search;
        if(req.body.search != "") {
          cnt = {$or:[{'question': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'answer': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'status': { $regex: '.*' + search + '.*',$options: 'i' }}]};
        }

        async.parallel({
          pairsTotalCount:function(cb) {
            faq.find(cnt).countDocuments().exec(cb);
          },
          pairsData:function(cb) {
            faq.find( cnt ).limit(limit).skip(skip).sort( srt ).exec(cb)
          },
        },function(err,results){
          if (err) return res.status(500).send(err);
          apiresponse.data        = [];
          apiresponse.status      = true;
          apiresponse.data        = results.pairsData;
          apiresponse.faqcount    = results.pairsTotalCount;
          apiresponse.message     = "";
          res.json(apiresponse);
        })
      } catch(e) {
        console.log("faqlist ----->",e);
      }
    });

  // update faq
    router.post('/editfaq',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      faq.findOneAndUpdate({ "_id": req.body._id },
        { "$set": 
        { "question"      : req.body.question,
          "answer"        : req.body.answer,
          "modifieddate"  : new Date()}},{multi: true}).
        exec(function(err, resUpdate){
          try {
            if(err) {
              res.status(500).send(err);
            } else {
              faq.find({ "_id": req.body._id }).exec(function(err,resData){
                if (err) return res.status(500).send(err);
                apiresponse.data    = [];
                apiresponse.status  = true;
                apiresponse.message = "Faq has been Updated";
                res.json(apiresponse);
              });
            }
          } catch (err) {
            console.info("emailtemplist", err)
          }
        });
    });
  
  // insert faq
    router.post('/insertfaq',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      var obj = {
                "question":req.body.question,
                "answer":req.body.answer,
              }
      faq.create(obj,function(err,resdata){
        apiresponse.data    = [];
        apiresponse.status  = true;
        apiresponse.message = "Faq has been Inserted";
        res.json(apiresponse);
      });
    });

  // delete faq
    router.post('/deletefaq',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      faq.deleteMany({"_id": req.body._id}).exec(function(delerr,deldata){
        if(deldata){
            res.json({
              status   : true,
              message  : "Faq has been Deleted !!!"
            });
        } else {

        }
      });       
    });

  // get faq
    router.get('/getfaq',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      faq.find().exec(function(reserr,resdata){
        if(resdata){
             res.json({
              status : true,
              data   : resdata
            });
        } else {

        }
      });       
    });

// faq section

// vote section
  var proposals     = mongoose.model('proposals');
  // list proposal 
    router.post('/proposallist', common.admintokenMiddleware , common.originMiddleware , async function(req,res){
      try {
        var skip    = req.body.page.pageNumber *  req.body.page.size;
        var limit   = req.body.page.size;
        let prop1   = req.body.sorting.prop;

        var dir     = req.body.sorting['dir'];
        var srt     = {}
        srt[prop1]  = dir == 'desc' ? -1 : 1;

        var cnt     = {};
        var search  = req.body.search;
        if(req.body.search != "") {
                cnt = {$or:[{'description': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'user_address': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'tx_id': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'propose_id': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'status': { $regex: '.*' + search + '.*',$options: 'i' }}]};
        }
        async.parallel({
          pairsTotalCount:function(cb) {
            proposals.find(cnt).countDocuments().exec(cb);
          },
          pairsData:function(cb) {
            proposals.find(cnt).limit(limit).skip(skip).sort(srt).exec(cb)
          },
        },function(err,results){
          if (err) return res.status(500).send(err);
          apiresponse.data        = [];
          apiresponse.status      = true;
          apiresponse.data        = results.pairsData;
          apiresponse.proposalcount    = results.pairsTotalCount;
          apiresponse.message     = "";
          res.json(apiresponse);
        });
      } catch(e) {
        console.log("proposallist ----->",e);
      }
    });
  

// vote section

// token lot section
  var tokenlots     = mongoose.model('tokenlots');
  // list tokenlots 
    router.post('/tokenlotslist', common.admintokenMiddleware , common.originMiddleware , async function(req,res){
      try {
        var skip    = req.body.page.pageNumber *  req.body.page.size;
        var limit   = req.body.page.size;
        let prop1   = req.body.sorting.prop;

        var dir     = req.body.sorting['dir'];
        var srt     = {}
        srt[prop1]  = dir == 'desc' ? -1 : 1;

        var cnt     = {};
        var search  = req.body.search;
        if(req.body.search != "") {
                cnt = {$or:[{'designation': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'price': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'price_btc': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'price_eth': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'price_usdt': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'location': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'total_supply': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'start_date': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'end_date': { $regex: '.*' + search + '.*',$options: 'i' }},
                      {'status': { $regex: '.*' + search + '.*',$options: 'i' }}]};
        }
        async.parallel({
          pairsTotalCount:function(cb) {
            tokenlots.find(cnt).countDocuments().exec(cb);
          },
          pairsData:function(cb) {
            tokenlots.find(cnt).limit(limit).skip(skip).sort(srt).exec(cb)
          },
        },function(err,results){
          if (err) return res.status(500).send(err);
          apiresponse.data              = [];
          apiresponse.status            = true;
          apiresponse.data              = results.pairsData;
          apiresponse.tokenlotscount     = results.pairsTotalCount;
          apiresponse.message           = "";
          res.json(apiresponse);
        });
      } catch(e) {
        console.log("proposallist ----->",e);
      }
    });

  // insert tokenlot
    const moment = require('moment-timezone');
    // router.post('/inserttokenlot',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
    router.post('/inserttokenlot',common.admintokenMiddleware, (req, res) => {
      var obj = {
                "designation":req.body.designation,
                "price":req.body.price,
                "price_btc":req.body.price_btc,
                "price_eth":req.body.price_eth,
                "price_usdt":req.body.price_usdt,
                "location":req.body.location,
                "total_supply":req.body.total_supply,
                "start_date":moment.tz(req.body.start_date, "Asia/Kolkata"),
                "end_date":moment.tz(req.body.end_date, "Asia/Kolkata"),
                "status":"Active",
                }
      // const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");
      tokenlots.create(obj,function(err,resdata){
        console.log("err ---->",err);
        apiresponse.data    = [];
        apiresponse.status  = true;
        apiresponse.message = "Token lot has been Inserted";
        res.json(apiresponse);
      });
    });
  
  // get tokenlot
    router.get('/gettokenlot',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      tokenlots.findOne({ "_id": req.body._id }).exec(function(reserr,resdata){
        if(resdata){
            res.json({
              status : true,
              data   : resdata
            });
        } else {
          res.json({
            status : false,
            data   : "Something went wrong. Please try again later."
          });
        }
      });       
    });

// token lot section

// currency section
  // list currecny 
    router.post('/currencylist', common.admintokenMiddleware , common.originMiddleware , async function(req,res){
      try {
        var skip    = req.body.page.pageNumber *  req.body.page.size;
        var limit   = req.body.page.size;
        let prop1   = req.body.sorting.prop;

        var dir     = req.body.sorting['dir'];
        var srt     = {}
        srt[prop1]  = dir == 'desc' ? -1 : 1;

        var cnt     = {};
        var search  = req.body.search;
        if(req.body.search != "") {
          cnt = {$or:[{'currencyName': { $regex: '.*' + search + '.*',$options: 'i' }},
                {'currencySymbol': { $regex: '.*' + search + '.*',$options: 'i' }},
                {'currency_type': { $regex: '.*' + search + '.*',$options: 'i' }},
                {'currency_image': { $regex: '.*' + search + '.*',$options: 'i' }},
                {'supply': { $regex: '.*' + search + '.*',$options: 'i' }},
                {'status': { $regex: '.*' + search + '.*',$options: 'i' }}]};
        }
        async.parallel({
          currencyTotalCount:function(cb) {
            currency.find(cnt).countDocuments().exec(cb);
          },
          currencyData:function(cb) {
            currency.find(cnt).limit(limit).skip(skip).sort(srt).exec(cb)
          },
        },function(err,results){
          if (err) return res.status(500).send(err);
          apiresponse.data              = [];
          apiresponse.status            = true;
          apiresponse.data              = results.currencyData;
          apiresponse.tokenlotscount    = results.currencyTotalCount;
          apiresponse.message           = "";
          res.json(apiresponse);
        });
      } catch(e) {
        console.log("proposallist ----->",e);
      }
    });

  // insert currency
    router.post('/insertcurrency',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      var obj = {
                "currencyName":req.body.currencyName,
                "currencySymbol":req.body.currencySymbol,
                "currency_type":req.body.currency_type,
                "currency_image":req.body.currency_image,
                "contract_address":req.body.contract_address,
                "currency_decimal":req.body.currency_decimal,
                "status":"Active",
                }
      currency.create(obj,function(err,resdata){
        apiresponse.data    = [];
        apiresponse.status  = true;
        apiresponse.message = "Token lot has been Inserted";
        res.json(apiresponse);
      });
    });
  
  // get currency
    router.get('/getcurrency',common.admintokenMiddleware, common.originMiddleware, (req, res) => {
      currency.findOne({ "_id": req.body._id }).exec(function(reserr,resdata){
        if(resdata){
            res.json({
              status : true,
              data   : resdata
            });
        } else {
          res.json({
            status : false,
            data   : "Something went wrong. Please try again later."
          });
        }
      });       
    });

// currency section



module.exports = router;