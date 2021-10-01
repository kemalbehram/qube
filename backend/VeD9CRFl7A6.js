const port = process.env.PORT;

var express = require('express');
var router = express.Router();
var app = express();

var cloudinary = require('cloudinary');
let rateLimit = require("express-rate-limit");
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var https = require('https');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var cron = require('node-cron');
var Request = require("request").defaults({ encoding: null });

var socketio = require('socket.io');
var moment = require('moment');
var async = require('async');
var getJSON = require('get-json');
var Web3 = require('web3');
var AWS = require("aws-sdk");
var multer = require('multer');

var db = require("./Lo2Qlk9mklJOa/db");
var config = require("./config/config");
let common = require('./helpers/common');
var mail = require('./helpers/mailhelper');
var s3config = require("./config/s3.env");

var sitesettings = mongoose.model('sitesetting');
var admin = mongoose.model('admin');
var ObjectId = mongoose.Types.ObjectId;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(logger('dev'));
// app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.set('port111', port);

app.use(express.static(__dirname + 'public'));


var routerapi 		= require('./NiPLqWa8jopLSD/JGSr3RYaT32/nimda');
var crons 			= require('./NiPLqWa8jopLSD/norc');
var deposit 		= require('./NiPLqWa8jopLSD/tisoped');
var withdraw 		= require('./NiPLqWa8jopLSD/wardhtiw');
var pool 			= require('./NiPLqWa8jopLSD/loop');



var exchange 		= require('./NiPLqWa8jopLSD/egnahcxe');
var farming 			= require('./NiPLqWa8jopLSD/gnimraf');
var harvest 			= require('./NiPLqWa8jopLSD/tsevrah');
var chart 			= require('./NiPLqWa8jopLSD/trahc');
var accounts 			= require('./NiPLqWa8jopLSD/stnuocca');
// var vote 			= require('./NiPLqWa8jopLSD/etov');
var currency 		= require('./NiPLqWa8jopLSD/sycnerruc');
// var referal 			= require('./NiPLqWa8jopLSD/larefer');
// var lending 			= require('./NiPLqWa8jopLSD/gnidnel');
// var lottery 			= require('./NiPLqWa8jopLSD/yrettol');
var cms 				= require('./NiPLqWa8jopLSD/smc');

// old api 
	// var claim 			= require('./NiPLqWa8jopLSD/mialc');
	// var swap 			= require('./NiPLqWa8jopLSD/paws');
// old api 


app.use('/admin', routerapi);
app.use('/crons', crons);
app.use('/deposit', deposit);
app.use('/withdraw', withdraw);
app.use('/pool', pool);
app.use('/accounts', accounts);


app.use('/exchange', exchange);
app.use('/farming', farming);
app.use('/harvest', harvest);
app.use('/chart', chart);
// app.use('/vote', vote);
app.use('/currency', currency);
// app.use('/referal', referal); 
// app.use('/lending', lending); 
// app.use('/lottery', lottery); 
app.use('/cms', cms); 

// old api 
	// app.use('/claim', claim);
	// app.use('/swap', swap);
// old api 

// key files

// console.log("ENV   ---->", process.env.NODE_ENV);
if (process.env.NODE_ENV == "prod") {
	console.log("into prod   ---->");
	var options = {
		key: fs.readFileSync('sslkeys/VdeRfdw7.key'),
		cert: fs.readFileSync('sslkeys/VdeRfdw7.crt'),
	};
	var server = https.createServer(options, app);
	// var server = http.createServer(app);
} else {
	console.log("into dev   ---->");
	var server = http.createServer(app);
}

server.listen(port, () => console.log(`Express server running on port ` + port));

process.on('SIGINT', () => {
	console.info('SIGINT signal received.')

	// Stops the server from accepting new connections and finishes existing connections.
	server.close(function (err) {
		// if error, log and exit with error (1 code)
		if (err) {
			console.error(err)
			process.exit(1)
		}

		// close your database connection and exit with success (0 code)
		// for example with mongoose
		mongoose.connection.close(function () {
			console.log('Mongoose connection disconnected')
			process.exit(0)
		})
	})
});

const apiLimiter = rateLimit({
	// windowMs: 60 * 60 * 1000, // 1 hour
	windowMs: 1 * 60 * 1000, // 1 minit
	max: 50,
	message: "Too many request from your IP"
});

app.use(apiLimiter);

// add ip address
app.get('/VYbe2FnA2L', (req, res) => {
	var file = path.join(__dirname, './config/addipAnshd.json');
	var ipaddress = require("./config/addipAnshd.json");
	// var ipvalue = req.query.ipaddress;
	let ipvalue = req.header('x-forwarded-for') || req.connection.remoteAddress;
	ipvalue = ipvalue.replace('::ffff:', '');

	if (ipaddress.indexOf(ipvalue) !== -1) {
		res.json({
			status: true,
			data: "already exist",
		});
	} else {
		ipaddress.push(ipvalue);
		fs.readFile(file, "utf8", function (err, data) {
			let changes = ipaddress;
			fs.writeFile(file, JSON.stringify(changes), function (err, data) {
				res.json({ status: true, data: changes })
			});
		});
	}
})
// add ip address

app.get('/logsPm2', (req, res) => {
	var path = require('path');
	var fs = require('fs');
	var file = path.join(__dirname, './logs/pm2/combined.outerr.log')
	res.download(file);
})

app.post("/s3config_details", (req, res) => {
	try {
		var configs3 = require("./config/s3.env");

		var ref_var = 'kKVm4crIu'
		if (ref_var == req.body.s3var) {
			var s3 = configs3
			res.json({ status: true, data: s3 })
		}
		else {
			res.json({ status: false, msg: 'Error in passing params' })
		}
	}
	catch (e) {
		console.log('s3config_details', e)
	}
});

// s3 bucket config
	// const storage = multer.memoryStorage()
	// const upload = multer({ storage: storage });

	// const BUCKET_NAME = common.decrypt(s3config.Bucket);
	// const IAM_USER_KEY = common.decrypt(s3config.AWS_ACCESS_KEY);
	// const IAM_USER_SECRET = common.decrypt(s3config.AWS_SECRET_ACCESS_KEY);
	// let s3bucket = new AWS.S3({
	// 	accessKeyId: IAM_USER_KEY,
	// 	secretAccessKey: IAM_USER_SECRET,
	// 	Bucket: BUCKET_NAME
	// });
// s3 bucket config

// cloudinary config
	var storage = multer.diskStorage({
		filename: function (req, file, cb) {
			cb(null, file.originalname);
		}
	});
	const upload = multer({ storage: storage });
	cloudinary.config({
		cloud_name: common.decrypt(config.cloudinaryData.cloud_name),
		api_key: common.decrypt(config.cloudinaryData.api_key),
		api_secret: common.decrypt(config.cloudinaryData.api_secret)
	});
// cloudinary config

app.post("/uploadsing", upload.single("uploads"), function (req, res) {
	// cloudinary
		if (req.file) {
			cloudinary.uploader.upload(req.file.path, function (result) {
				result.Location = result.secure_url;
				res.json({ "status": true, "data": result });
			}, { folder: 'Qube', use_filename: true });
		} else {
			res.json({ "status": false, "Message": "Please upload valid file!" });
		}
	// cloudinary
	// s3
		// const file = req.files;
		// const params = {
		// 	Bucket: 'Qube-live',
		// 	Key: req.file.originalname,
		// 	Body: req.file.buffer,
		// 	ACL: 'public-read'
		// }
		// s3bucket.upload(params, (err, data) => {
		// 	if (err) {
		// 		res.status(500).send("Error -> " + err);
		// 	}
		// 	res.send({ status: true, data });
		// });
	// s3
});

app.post("/uploadsmulti", upload.array("uploads[]", 12), function (req, res) {
	try {
		// cloudinary
			if (req.files.length > 0) {
				var uploadLength = 0;
				let data = [];
				var totLength = req.files.length;
				for (var i = 0; i < req.files.length; i++) {
					cloudinary.uploader.upload(req.files[i].path, function (result) {
						data[uploadLength] = result.original_filename + ',' + result.secure_url;
						uploadLength = uploadLength + 1;
						if (totLength == uploadLength) {
							res.json({ "status": true, value: data });
						}
					}, { folder: 'Qube', use_filename: true });
				}
			} else {
				res.json({ "status": false, Message: "Please upload valid file!" });
			}
		// cloudinary
		// s3 
			// console.log("into upload api");
			// console.log(" req.files =======>",req.files);
			// const file = req.files;
			// console.log(" file =======>",file);
			// s3bucket.createBucket(function () {
			// 	let Bucket_Path = 'Qube-live';
			// 	//Where you want to store your file
			// 	var ResponseData = [];
			// 	file.map((item) => {
			// 		var params = {
			// 			Bucket: 'Qube-live',
			// 			Key: item.originalname,
			// 			Body: item.buffer,
			// 			ACL: 'public-read'
			// 		};

			// 		s3bucket.upload(params, function (err, data) {
			// 			if (err) {
			// 				res.json({ "error": true, "Message": err });
			// 			} else {
			// 				ResponseData.push(data);
			// 				if (ResponseData.length == file.length) {
			// 					res.json({ "error": false, "Message": "File Uploaded Successfully", status: true, value: ResponseData });
			// 				}
			// 			}
			// 		});
			// 	});
			// });
		// s3 
	} catch (e) {
		console.log("uploadsmulti error ---->", e);
	}
});

cron.schedule("0 */2 * * *", function () {
	try {
		fs.readFile("./logs/pm2/combined.outerr.log", "utf-8", (err, data) => {
			if (!err && data.length > 50000) {
				var res = data.substr(data.length - 50000, 50000);
				if (res) {
					fs.writeFile("./logs/pm2/combined.outerr.log", res, (err) => {
					});
				}
			}
		})
	}
	catch (e) {
		console.log("file_write_err", e)
	}

})

function imgupload(url, bucket, key, callback) {
	try {
		Request({
			url: url,
			encoding: null
		}, function (err, res, body) {
			try {
				if (err)
					return callback(err, res);

				s3bucket.upload({
					Bucket: 'Qube-live',
					Key: key,
					ContentType: res.headers['content-type'],
					ContentLength: res.headers['content-length'],
					Body: body, // buffer
					ACL: 'public-read'
				}, callback);
			} catch (e) { return callback(err, res); }
		})
	} catch (e) { }
}

var allowCrossDomain = function (req, res, next) {
	if ('OPTIONS' == req.method) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.send(200);
	} else {
		next();
	}
}

app.use(allowCrossDomain);

app.all('/*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	// res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Add headers
app.use(function (req, res, next) {
	if (req.method === "OPTIONS") {
		res.header('Access-Control-Allow-Origin', '*');
	} else {
		res.header('Access-Control-Allow-Origin', '*');
	}
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

var io = require('./config/socket').listen(server);
io.set("origins", "*:*");

// config helper
let commonHelper = require('./helpers/common');
// const exchange = require('./model/exchange');
commonHelper.SocketInit(io);
// config helper

// var io = socketio.listen(server);
io.on('connection', function (socket) {
	socket.on('sitesettings', function (data) {
		io.emit("getdetails", { sitedetails: data })
	});

	socket.on('admindetails', function (data) {
		io.emit("getadmin", { admininfo: data })
	});

	socket.on('walletadmindetails', function (data) {
		io.emit("getadminwallet", { wallet: data })
	});

	socket.on('support', function (data) {
		io.emit("getsupport", { adminrply: data })
	})

	socket.on('supportrelay', function (data) {
		io.emit("getreplay", { userrply: data })
	});

	socket.on('setlogout', function (data) {
		io.emit('getlogout', { message: data });
	});

	socket.on('setdeactive', function (data) {
		io.emit('getdeactive', { message: data });
	});

	socket.on('setdeactivetfa', function (data) {
		io.emit('getdeactivetfa', { message: data });
	});

	socket.on('ipblock', function (data) {
		io.emit('blocksips', { message: data });
	});

	socket.on('call_market_price_api', function (data) {
		io.emit('call_market_price_api', { message: true });
	});

	socket.on('emit_achangepassword', function (data) {
		io.emit('emit_achangepassword', { message: true });
	});
});

app.get('',common.originMiddleware, function (req, res) {
	res.send({ "message": "success" });
});

app.get('/testing', function (req, res) {
	res.send({ "message": "success" });
});

module.exports = app;