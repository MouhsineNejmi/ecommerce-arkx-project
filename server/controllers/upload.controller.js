const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require('../config/cloudinary');
const { handleMultipleImagesUpload } = require('../utils/handleUpload.utils');

const Product = require('../models/product.model');

exports.uploadImagesToCloudinary = async (req, res, next) => {
  const files = req.files;

  console.log(files);

  // const uploadedImages = await handleMultipleImagesUpload(product_images);

  // console.log(uploadedImages);

  // try {
  //   const result = await uploadToCloudinary(product_images);

  //   console.log(result);

  //   const updatedProduct = await Product.findOneAndUpdate(
  //     { _id: req.body.productId },
  //     { $push: { product_images: result.secure_url } },
  //     { new: true }
  //   );

  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       result,
  //       product_images: updatedProduct.product_images,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  //   next(error);
  // }
};

exports.deleteImageFromCloudinary = async (req, res, next) => {
  const { product_image } = req.body;
  try {
    const result = await deleteFromCloudinary(req.params.public_id);

    const updatedProduct = await Product.findOneAndUpdate(
      { product_images: { $in: [product_image] } },
      { $pull: { product_images: product_image } },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        result,
        product_images: updatedProduct.product_images,
      },
    });
  } catch (error) {
    next(error);
  }
};
