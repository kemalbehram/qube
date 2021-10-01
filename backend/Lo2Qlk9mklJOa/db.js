// Bring Mongoose into the app
var mongoose = require( 'mongoose' );
var config   = require("../config/config");
// Create the database connection
//mongoose.connection.openUri(dbURI);
const CryptoJS = require('crypto-js');
var key = CryptoJS.enc.Base64.parse("#base64Key#");
var iv  = CryptoJS.enc.Base64.parse("#base64IV#");

var cipher = CryptoJS.AES.encrypt(config.dbconnection, key, {iv: iv}).toString();
var decipher = CryptoJS.AES.decrypt(config.dbconnection, key, {iv: iv});
var decrypt_val = decipher.toString(CryptoJS.enc.Utf8);
let dbconnection = decrypt_val;
// dbconnection='mongodb://localhost:27017/qubeswap';

// console.log("dbconnection ---->",dbconnection);

mongoose.connect(dbconnection, { useNewUrlParser: true,useUnifiedTopology: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  //console.log('Mongoose default connection open to ' + config.dbconnection);
  console.log('Mongoose default connection open to DATE ' + new Date());
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected',new Date());
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
// require('./index');
require('./etalpmetliame'); 

require('./nimda');
require('./smc'); 
require('./banner'); 
require('./qaf');
require('./gnittesetis');
require('./citats');
require('./kcolbpi');
require('./lasopsid');
require('./golnimda');

// need
require('./ycnerruc');
require('./sriap');
require('./gol_loop');
require('./sredloHnekot');
require('./tisoped');
require('./wardhtiw');
require('./egnahcxe');
require('./loop_evomer');
require('./tsevrah');
require('./tsil_yrrehc');
require('./nekot_trahc');
require('./riap_trahc');
require('./ytiduqil_trahc');
require('./emulov_trahc');
require('./slasoporp');
require('./stolnekot');
require('./tsil_nekotyub');