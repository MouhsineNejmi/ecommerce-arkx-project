const Categories = require('../models/category.model');
const { handleUpload } = require('../utils/handleUpload.utils');

exports.createNewCategory = async (req, res, next) => {
  try {
    const { category_name, active } = req.body;

    const existingCategory = await Categories.findOne({ category_name });
    if (typeof category_name !== 'string') {
      return res.status(400).json({
        status: 400,
        message: 'Category name must be a string',
      });
    }
    if (existingCategory) {
      return res.status(400).json({
        status: 400,
        message: 'The category already exist',
      });
    }

    const category_image = await handleUpload(req.file);

    const newCategory = await Categories.create({
      name: category_name,
      category_image,
      active,
    });

    return res.status(201).json({
      status: 201,
      message: 'Category created successfully',
      newCategory,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.listAllCategories = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const categories = await Categories.find().skip(skip).limit(perPage);

    return res.status(200).json({
      status: 200,
      data: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error?.message,
    });
  }
};

exports.searchCategories = async (req, res) => {
  try {
    const query = { active: true };
    const page = req.query.page || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;
    const categories = await Categories.find(query).skip(skip).limit(perPage);
    return res.status(200).json({
      status: 200,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error?.message,
    });
  }
};

exports.getCategoryByID = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Categories.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      status: 200,
      data: category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error?.message,
    });
  }
};

exports.updateCategoryData = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategoryData = req.body;

    const existingCategory = await Categories.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({
        status: 404,
        message: 'Invalid category id',
      });
    }

    if (updatedCategoryData.name) {
      const categoryWithSameName = await Categories.findOne({
        name: updatedCategoryData.name,
      });
      if (
        categoryWithSameName &&
        categoryWithSameName._id.toString() !== categoryId
      ) {
        return res.status(400).json({
          status: 400,
          message: 'Category name must be unique',
        });
      }
    }

    await Categories.findByIdAndUpdate(categoryId, updatedCategoryData);

    return res.status(200).json({
      status: 200,
      message: 'Category updated successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error?.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Categories.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({
        status: 404,
        message: 'Category not found',
      });
    }

    return res.status(204).json({
      status: 204,
      message: 'Category deleted Successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Subcategories attached, cannot delete this category',
    });
  }
};
