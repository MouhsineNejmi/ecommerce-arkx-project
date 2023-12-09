const uploadToCloudinary = require('../config/cloudinary');

const handleUpload = async (file) => {
  const b64 = Buffer.from(file.buffer).toString('base64');
  let dataURI = 'data:' + file.mimetype + ';base64,' + b64;

  const cldRes = await uploadToCloudinary(dataURI);
  return cldRes.secure_url;
};

const handleMultipleImagesUpload = async (files) => {
  const uploadPromises = files.map(async (file) => {
    return await handleUpload(file);
  });

  const urls = await Promise.all(uploadPromises);
  return urls;
};

module.exports = { handleUpload, handleMultipleImagesUpload };
