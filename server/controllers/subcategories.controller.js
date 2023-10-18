const SubCategories = require("../models/subcategories.model");

exports.createNewSubCategory = async (req, res) => {
  try {
    const { subcategory_name, category_id } = req.body;

    const newSubCategory = await SubCategories.create({
      subcategory_name,
      category_id,
      active: true,
    });

    console.log(newSubCategory);

    return res.status(201).json({
      status: 201,
      message: "Subcategory created successfully",
      data: newSubCategory,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error?.message,
    });
  }
};

exports.listAllSubCategories = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const subCategories = await SubCategories.find().skip(skip).limit(perPage);

    return res.json({ status: 200, message: subCategories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error?.message,
    });
  }
};

exports.searchSubCategories = async (req, res) => {
  try {
    const { query } = req.query;
    const page = req.query.page || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const subCategory = await SubCategories.find({
      subcategory_name: { $regex: new RegExp(query, "i") },
    })
      .skip(skip)
      .limit(perPage);

    if (!subCategory) {
      return res.json({ message: "Subcategory not found" });
    }

    return res.status(200).json({
      status: 200,
      data: subCategory,
    });
  } catch (error) {
    return res.json({
      message: error?.message,
    });
  }
};

exports.GetSubCategoryByID = async (req, res) => {
  try {
    const subCatId = req.params.id;
    const subCat = await SubCategories.findById(subCatId);

    if (!subCat) {
      return res.status(404).json({
        status: 404,
        message: "SubCategory Not Found",
      });
    }
    return res.status(200).json({
      status: 200,
      success: true,
      subCat,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: error?.message,
    });
  }
};

exports.updateSubCategoryData = async (req, res) => {
  try {
    const subCatId = req.params.id;
    const subCat = await SubCategories.findById(subCatId);

    if (!subCat) {
      return res.status(404).json({
        status: 404,
        message: "Invalid Subcategory Id",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Subcategory updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: error?.message,
    });
  }
};
exports.deleteSubCategory = async (req, res) => {
  try {
    const subCat = req.params.id;
    const deleteSubCat = await SubCategories.findByIdAndDelete(subCat);

    if (!deleteSubCat) {
      return res.status(404).json({
        status: 404,
        message: "Invalid subcategory id",
      });
    }
    res.status(200).json({
      status: 200,
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({
        status: 400,
        message: "Products attached, cannot delete this subcategory",
      });
    } else {
      return res.json({
        error: error?.message,
      });
    }
  }
};
