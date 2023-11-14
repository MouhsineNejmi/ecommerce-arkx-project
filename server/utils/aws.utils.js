const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');

const s3Client = require('../config/aws-s3');

exports.generateKey = (originalname) => `${originalname}-${uuidv4()}`;

exports.uploadImageToS3 = async (file) => {
  const key = generateKey(originalname);

  try {
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3Client.send(uploadCommand);
    return key;
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.getImageLink = async (fileKey) => {
  try {
    const getCommand = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });

    const url = await getSignedUrl(s3Client, getCommand);
    return url;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.deleteImage = async (filekey) => {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filekey,
    });

    await s3Client.send(deleteCommand);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error?.message,
    });
  }
};
