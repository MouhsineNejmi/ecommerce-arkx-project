const subCategories = require('../models/subcategories.model');

exports.createNewSubCategory = async (req, res) => {
    try {
        const {
            subcategory_name,
            category_id,
            active
        } = req.body

        const newSubCategory = await subCategories.create({
            subcategory_name,
            category_id,
            active
        });
        
        console.log(newSubCategory);

        return res.status(201).json({
            status: 201,
            message: "Subcategory created successfully",
            newSubCategory
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }
};

exports.listAllSubCategories = async (req, res) => {

}

exports.GetSubCategoryByID = async (req, res) => {

}

exports.searchSubCategories = async (req, res) => {

}

exports.updateSubCategoryData = async (req, res) => {

}
exports.deleteSubCategory = async (req, res) => {

}