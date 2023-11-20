require('dotenv').config();
const { S3Client } = require('@aws-sdk/client-s3');

const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    region: bucketRegion,
});

s3Client.middlewareStack.add(
  (next) => async (args) => {
    delete args.request.headers['content-type'];
    return next(args);
  },
  { step: 'build' }
);

module.exports = s3Client;
