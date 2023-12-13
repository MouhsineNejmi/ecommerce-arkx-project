require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadToCloudinary = async (file) => {
  const response = await cloudinary.uploader.upload(file, {
    resource_type: 'image',
  });
  return response;
};

exports.deleteFromCloudinary = async (public_id) => {
  const response = await cloudinary.uploader.destroy(public_id);

  return response;
};
