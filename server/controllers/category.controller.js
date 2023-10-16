const Categories = require('../models/category.model');
const Category = require('../models/category.model');

exports.createNewCategory = async (req, res) => {
    try {
        const {
            category_name,
            active
        } = req.body;

        const newCategory = await Category.create({
            category_name,
            active
        });
        console.log(newCategory);
        
        return res.status(201).json({
            status: 201,
            message: "Category created successfully",
            newCategory
        });
    } catch (error) {
        console.error();
        return res.status(400).json({
            status: 400,
            message: "The category already exist"
        })
    }
};

exports.listAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            status: 200,
            categories
        });
    } catch (error) {
        console.error();
        res.status(500).json({
            message: error?.message
        })
    }

};

exports.searchCategories = async (req, res) => {
    try {
        const query = { active: true};
        const categories = await Categories.find(query);
        res.json({
            status: 200,
            categories
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getCategoryByID = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Categories.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "Category not found"
      });
    }

    res.status(200).json({
      status: 200,
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
};

exports.updateCategoryData = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Categories.findById(categoryId);

        if(!category){
            return res.status(404).json({
                status: 404,
                message: "Invalid category id"
            });
        }
        return res.status(200).json({
            status: 200,
            message: "category updated successfully"
        })
    } catch (error) {
        console.error();
        res.status(403).json({
            status: 403,
            message: "You don't have enough privilege"
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
          message: "Category not found"
        });
      }
  
      res.status(200).json({
        status: 200,
        message: "Category deleted Successfully"
      });
    } catch (error) {
      console.error(error);
      if (error.name === 'CastError') {
        return res.status(400).json({
          status: 400,
          message: "Invalid category ID format"
        });
      } else {
        res.status(500).json({
          status: 500,
          message: "Subcategories attached, cannot delete this category"
        });
      }
    }
  };
  
