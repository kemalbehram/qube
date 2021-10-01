const CryptoJS = require('crypto-js');
var key = CryptoJS.enc.Base64.parse("#base64Key#");
var iv  = CryptoJS.enc.Base64.parse("#base64IV#");
let jwt = require('jsonwebtoken');
// let password = 'T1Bt0Lx5jA9ML6AJ8523IAv0anRd03Ya'
// let algorithm = 'aes-256-ctr'
var ip = require("ip");


var mongoose  = require('mongoose');

let jwtToken = '7aCdTmziZnItrn8ap9c2kZ';
let admin_jwtToken = 'VCdTmziZnIt79rnapc2kZ';
let ipblock = mongoose.model('ipblock');
let originCheck = require('../config/vC7wdNGrjM.json');

exports.encrypt = (value) => {
    var cipher = CryptoJS.AES.encrypt(value, key, {iv: iv}).toString(); 
    return cipher;
}

exports.decrypt = (value) => {
    var decipher = CryptoJS.AES.decrypt(value, key, {iv: iv})
    var decrypt_val = decipher.toString(CryptoJS.enc.Utf8);
    return decrypt_val;
}
exports.createPayload = (key) => {
    let payload = { subject: key }
    let token = jwt.sign(payload, jwtToken)
    return token;
}
exports.admin_createPayload = (key) => {
    let payload = { subject: key }
    let token = jwt.sign(payload, admin_jwtToken)
    return token;
}
var socket = 0;
exports.SocketInit = function (socketIO)
{
   socket = socketIO;
}

  exports.urllink=(value)=>{
    // var origin="http://localhost:4310"
    var origin="fronturl"
    return origin
}
  exports.urlkyc=(value)=>{
    // var kycorigin="http://localhost:4310"
    var kycorigin="fronturl"
    return kycorigin
}
  exports.ulink=(value)=>{
    // var adminorigin="http://localhost:4330"
    var adminorigin="adminurl"
    return adminorigin
}
exports.tokenMiddleware = (request, res, next) => {

    if (!request.headers.authorization) {
        return res.status(401).send('unauthorized')
    }
    let token = request.headers.authorization.split(' ')[1];

    if (token === 'null') {
        return res.status(401).send('unauthorized')
    } else {
        let payload = jwt.verify(token, jwtToken)
        
        if (!payload) {
            return res.status(401).send('unauthorized')
        }
        request.userId = payload.subject;
        

        next();
    }
}

// exports.admintokenMiddleware = (request, res, next) => {

//     if (!request.headers.authorization) {
//         return res.status(401).send('unauthorized')
//     }
//     let token = request.headers.authorization.split(' ')[1];

//     if (token == 'null') {
//         return res.status(401).send('unauthorized')
//     } else {
//         var ipaddress   = require("../config/addipAnshd.json");
//         let ip          = request.header('x-forwarded-for') || request.connection.remoteAddress;
//         ip              = ip.replace('::ffff:', ''); 
//         if(ip.trim() == "122.173.91.131" || ip.trim() =="2409:4072:391:d37c:b812:7b8:ccf8:a4a0"){
//             // ip              = "::1"; 
//             if(ip=="::1"){
//                 let payload = jwt.verify(token, admin_jwtToken)
                    
//                 if (!payload) {
//                     return res.status(401).send('unauthorized')
//                 }
//                 request.userId = payload.subject;
                
//                 next();
//             }else{
//                 if(ipaddress.indexOf(ip) !== -1){
//                     if(1==1){

//                         let payload = jwt.verify(token, admin_jwtToken)
                        
//                         if (!payload) {
//                             return res.status(401).send('unauthorized')
//                         }
//                         request.userId = payload.subject;
                        
//                         next();
//                     }else{
//                         return res.status(401).send('unauthorized')
//                     }
//             // }
//                 }
//             }
//         }
//     }
// }

exports.admintokenMiddleware = (request, res, next) => {
    if(!request.headers.authorization) {
        return res.status(401).send('unauthorized')
    }
    let token = request.headers.authorization.split(' ')[1];
    if(token == 'null') {
        return res.status(401).send('unauthorized')
    } else {
        var ipaddress   = require("../config/addipAnshd.json");
        let ip          = request.header('x-forwarded-for') || request.connection.remoteAddress;
        ip              = ip.replace('::ffff:', ''); 
        if(originCheck.indexOf(ip.trim()) != -1) {
            verifyPayload(request, res, token, next);
        } else if(ip =="::1") {
            verifyPayload(request, res, token, next);
        } else if(ipaddress.indexOf(ip) !== -1) {
            // if(1==1){
            verifyPayload(request, res, token, next);
            // }else{
            //     return res.status(401).send('unauthorized')
            // }
        } else {
            return res.status(401).send('unauthorized')
        }
    }
}

function verifyPayload(request, res, token, next){
    let payload = jwt.verify(token, admin_jwtToken)
    if (!payload) {
        return res.status(401).send('unauthorized')
    }
    request.userId = payload.subject;
    next();
}

// origin check 

exports.originMiddleware = async (req, res, next) => {
    try{
        let failed = false;
        const corsWhitelist = originCheck;
        // next();
        let ipBlockDetails = await ipblock.findOne({user_ip:ip.address(),status:0}).lean();
        if(ipBlockDetails && (req.headers.origin != 'adminurl')) {
            return res.json({status:false, msg:'Your Ip is blocked'})
        } else {
            // return next();
            // false;
            if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
                req.device = "Web";
                next();
            } else {
                var agent           = req.headers['user-agent'];
                var agent_array     = agent.split("Android");
                if(agent_array.length > 1) {
                    req.device = "Android";
                    next();
                } else {
                    var agent_array_iOS     = agent.split("iOS");
                    if(agent_array_iOS.length > 1) {
                        req.device = "iOS";
                        next();
                    } else {
                        // failed = true;
                        // res.send(403);
                        return res.status(401).send('Un-authorized')
                    }
                }
            }
        } 
    }catch(e){
        console.log("origin check error---------> " , e)
    }
}

// origin check 

// random number check
    exports.randomString=(length, chars) => {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
// random number check


exports.digitset = (n,decimal) => {
    n = parseFloat(n);
    n = n.toString();
    if(n.indexOf(".") == -1){
       
        n = (+n).toFixed(decimal);
        return n
    } else {
     
        n = n.slice(0, (n.indexOf(".")) + (decimal + 1));
        n = (+n).toFixed(decimal);
        return n
    }
}

// push notification
    var path = require('path');
    var fcm_file = path.join(__dirname, './serviceAccountKey.json');
    
    var fcm = require('fcm-notification');
    var FCM = new fcm(fcm_file);
    var token = '';
    exports.push_notification = (message,devicetoken) => {
        try {
            // fcm-notification npm code 
                // single
                        var message = {
                            data: {    //This is only optional, you can send any data
                                score: '850',
                                time: '2:45'
                            },
                            notification:{
                                title : "Aaveclone",
                                body : message
                            },
                            token : devicetoken
                        };
                     
                    FCM.send(message, function(err, response) {
                        if(err) {
                            return err
                        } else {
                            return response
                        }
                    })
                // single
            // fcm-notification npm code 
        } catch(e) {
            console.log("push_notification error ---->",e)
        }
    }
// push notification

// socket call
    exports.socket_emit = (method) => {
      socket.sockets.emit(method, "ok");
    }
// socket call

// set token value 
    exports.set_tokenvalue = (usertoken,admintoken) => {
        jwtToken1       = usertoken;
        admin_jwtToken  = admintoken;
    }
// set token value 