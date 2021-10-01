var nodemailer = require('nodemailer');
let nodemailerSendgrid = require('nodemailer-sendgrid');
var mongoose  = require('mongoose');
let common = require('./common'); 
var mail = require("../config/7vqnWApEfX");


// var hostname 	= common.decrypt(mail.host);
var username    = common.decrypt(mail.user);
var password    = common.decrypt(mail.pass);
var from_value 	= common.decrypt(mail.from);

// var hostname 	= mail.host;
// var username    = mail.user;
// var password    = mail.pass;
// var from_value 	= mail.from;

// old code
	// var transporter = nodemailer.createTransport({
	//   host: hostname,
	//   port: 465,
	//   secure: true,
	//   auth: {
	//   	user: username,
	//      pass: password
	//   }
	// });
// old code

// new code
	const transporter = nodemailer.createTransport(
	    nodemailerSendgrid({
	        // apiKey: "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"
	        apiKey: password
	    })
	);
// new code

module.exports = {
	sendMail : function(type,values,callback){
		let mailOptions = {
	      // from: "info@qubecs.com",	      
	      from: from_value,	      
	    };

		if(type=='newsletter'){
			mailOptions["bcc"]=values.to;
		}
		else{
			mailOptions["to"]=values.to;
		}
	    
		switch(type){
	      case 'register':
	      
	        mailOptions['subject'] = 'Qube - Account confirmation mail';
	        mailOptions['html'] = values.html;
	      break; 
	        case 'Notification Alert':
	      
	        mailOptions['subject'] = 'Qube - Notification Alert';
	        mailOptions['html'] = values.html;
	      break;

	      case 'Cancel Deposit':
	      
	        mailOptions['subject'] = 'Qube - Cancel Deposit Request';
	        mailOptions['html'] = values.html;
	      break;

	      case 'Cancel withdraw':
	      
	        mailOptions['subject'] = 'Qube - Cancel  withdraw Request';
	        mailOptions['html'] = values.html;
	      break;
	       case 'User OTP':
	      
	        mailOptions['subject'] = 'Qube - OTP Alert';
	        mailOptions['html'] = values.html;
	      break;

	       case 'KYC Admin approve':
	      
	        mailOptions['subject'] = 'Qube - KYC Admin Approve';
	        mailOptions['html'] = values.html;
	      break; 

	      case 'KYC Admin reject':
	      
	        mailOptions['subject'] = 'Qube - KYC Admin Reject';
	        mailOptions['html'] = values.html;
	      break; 

	      case 'KYC Approve':
	      
	        mailOptions['subject'] = 'Qube - KYC Approve';
	        mailOptions['html'] = values.html;
	      break;
	       case 'Kyc Reject':
	      
	        mailOptions['subject'] = 'Qube - Kyc Reject';
	        mailOptions['html'] = values.html;
	      break;
	      case 'forgetPtrnAdmin':
	        mailOptions['subject'] = 'Qube - Reset Pin request';
	        mailOptions['html'] = values.html;
	      break;
	      case 'forgetPwd':
	        mailOptions['subject'] = 'Qube - Reset Pin request';
	        mailOptions['html'] = values.html;
	      break;
	       case 'depositApprove':
	        mailOptions['subject'] = 'Qube - Deposit Approve';
	        mailOptions['html'] = values.html;
	      break;
	       case 'withdrawApprove':
	        mailOptions['subject'] = 'Qube - Withdraw Approve';
	        mailOptions['html'] = values.html;
	      break;
	        case 'Deposit Cancel':
	        mailOptions['subject'] = 'Qube - Deposit Cancelled';
	        mailOptions['html'] = values.html;
	      break;

	         case 'Deposit Approve':
	        mailOptions['subject'] = 'Qube - Deposit Approved';
	        mailOptions['html'] = values.html;
	      break;

	      case 'crypto Approve':
	        mailOptions['subject'] = 'Qube - Crypto withdraw Approved';
	        mailOptions['html'] = values.html;
	      break;

	      case 'crypto reject':
	        mailOptions['subject'] = 'Qube - Crypto withdraw reject';
	        mailOptions['html'] = values.html;
	      break;

	      case 'contactusfunction':
	        mailOptions['subject'] = 'Qube - Contact us';
	        mailOptions['text'] = values.text;
	        mailOptions['html'] = values.html;
	      break;
	        
	       case 'Deposit Admin':
	        mailOptions['subject'] = 'Qube - Deposit Request';
	        mailOptions['html'] = values.html;
	      break;  
	      case 'UserDeposit Request':
	        mailOptions['subject'] = 'Qube - User Requesting the Deposit';
	        mailOptions['html'] = values.html;
	      break;
	      case 'withdraw Admin':
	        mailOptions['subject'] = 'Qube - User Requesting the Withdraw';
	        mailOptions['html'] = values.html;
	      break;

	      case 'UserWithdraw Request':
	        mailOptions['subject'] = 'Qube - Withdraw Request';
	        mailOptions['html'] = values.html;
	      break;

	      case 'withdrawCancel':
	      mailOptions['subject'] = 'Qube - Withdraw cancelled';
	      mailOptions['html'] = values.html;
	      break;
	          case 'withdrawPending':
	      mailOptions['subject'] = 'Qube - Withdraw pending';
	      mailOptions['html'] = values.html;
	      break;
	          case 'withdrawComplete':
	      mailOptions['subject'] = 'Qube - Withdraw completed';
	      mailOptions['html'] = values.html;
	      break;
	          
	       case 'forgetPwdAdmin':
	        mailOptions['subject'] = 'Qube - Reset password request';
	       mailOptions['html'] = values.html;
	      break;
  

	      case 'newlogin':
	        mailOptions['subject'] = 'Qube - New Device Login';
	        mailOptions['html'] = values.html;
	      break;


	      case 'changePwd':
	        mailOptions['subject'] = 'Qube - Change password';
	        mailOptions['html'] = values.html;
	      break;

	      case 'profileupdate':
	        mailOptions['subject'] = 'Qube - Profile Update';
	        mailOptions['html'] = values.html;
	     break;
   
	    
	      case 'newsletter':
	        mailOptions['subject'] = 'Qube - News/Announcement';
	        mailOptions['html'] = values.html;
	      break;
	      case 'account deactivate':
	        mailOptions['subject'] = 'Qube - Account Deactivate';
	        mailOptions['html'] = values.html;
	      break;
	  
	      case 'Admin OTP':
	        mailOptions['subject'] = 'Qube - Admin OTP';
	        mailOptions['html'] = values.html;
	      break;


	      case 'loginalert':
	        mailOptions['subject'] = 'Qube - Login OTP';
	        mailOptions['html'] = values.html;
	      break;

	      case 'successmail':
	        mailOptions['subject'] = 'Qube - Login Alert';
	        mailOptions['html'] = values.html;
	      break;

	      case 'support Admin':
	        mailOptions['subject'] = 'Qube - Support Ticket';
	        mailOptions['html'] = values.html;
	      break;

         case 'oldemailidchange':
	        mailOptions['subject'] = 'Qube - Old Emailid Change';
	        mailOptions['html'] = values.html;
	      break;
          case 'emailidchange':
	        mailOptions['subject'] = 'Qube - Emailid Change';
	        mailOptions['html'] = values.html;
	      break;
	      case 'inviteuser':
	        mailOptions['subject'] = 'Qube - Invite User';
	        mailOptions['html'] = values.html;
	      break;

	       case 'subadmin':
	        mailOptions['subject'] = 'Qube - subadmin ';
	        mailOptions['html'] = values.html;
	      break;


	     


	      default:
	      break;
	    }

	    // var mailinput = {"emailid":mailOptions["to"],"type":type,"html":mailOptions['html'],"status":0};
	    // mailhistory.create(mailinput, function (cerr, results) {
	    // 	var mailsendid = results._id;
	    	
	    // });
	    transporter.sendMail(mailOptions, function(error, info){
	      if (error) {
		  } else {
		  	mailhistory.findOneAndUpdate({ "_id": mailsendid },
		    { "$set": {"status": 1}},{multi: true}).
		    exec(function(err, resUpdate){
		    });
		  }
		});
    	callback(true);
	}

};