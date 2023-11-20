const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3Client = require('../config/aws-s3');

exports.uploadImageToS3 = async (file) => {
  console.log(file);

  const key = Date.now() + '_' + file.fieldname + '_' + file.originalname;
  // const key = `${userId}/${Date.now()}_${file.fieldname}_${file.originalname}`;

  try {
    const command = new PutObjectCommand({
      client: s3Client,
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
    });
    const url = await getSignedUrl(s3Client, command);

    await s3Client.send(command);
    return url;
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

    const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 604800 });
    console.log(url);
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
