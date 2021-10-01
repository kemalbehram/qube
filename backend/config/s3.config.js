const AWS = require('aws-sdk');
const envs = require('./s3.env.js');
const s3 = new AWS.S3({
    accessKeyId: envs.AWS_ACCESS_KEY,
    secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
	region : envs.REGION
}); 
module.exports = s3;