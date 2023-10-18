const Categories = require('../models/category.model');

exports.createNewCategory = async (req, res) => {
    try {
        const {
            category_name,
            active
        } = req.body;

        const existingCategory = await Category.findOne({category_name});
        if(typeof category_name !== 'string'){
          return res.status(400).json({
            status: 400,
            message: "Category name must be a string"
          })
        }
        if(existingCategory){
          return res.status(400).json({
            status: 400,
            message: "The category already exist"
        })
        }
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
        res.status(500).json({
          status: 500,
          message : "Internal server error"
        })
    }
};

exports.listAllCategories = async (req, res) => {
    try {
      const page = req.query.page || 1;
      const perPage = 10;
      const skip = (page - 1) * perPage;

      const categories = await Category.find().skip(skip).limit(perPage);
      if(categories.length === 0){
        res.status(200).json({
            status: 200,
            categories : []
          })
      }else{
        res.status(200).json({
          status: 200,
          categories
        })
      }
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
        const page = req.query.page || 1;
        const perPage = 10;
        const skip = (page - 1) * perPage;
        const categories = await Categories.find(query).skip(skip).limit(perPage);

        if(categories.length === 0){
        res.status(200).json({
            status: 200,
            categories : []
          })
      }else{
        res.status(200).json({
          status: 200,
          categories
        })
      }
    } catch (error) {
        res.status(500).json({
            message: error?.message
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
    const updatedCategoryData = req.body;

    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
        return res.status(404).json({
            status: 404,
            message: "Invalid category id"
        });
    }

    if (updatedCategoryData.name) {
        const categoryWithSameName = await Category.findOne({ name: updatedCategoryData.name });
        if (categoryWithSameName && categoryWithSameName._id.toString() !== categoryId) {
            return res.status(400).json({
                status: 400,
                message: "Category name must be unique"
            });
        }
    }

    await Categories.findByIdAndUpdate(categoryId, updatedCategoryData);

    return res.status(200).json({
        status: 200,
        message: "Category updated successfully"
    });

} catch (error) {
    console.error(error);
    res.status(500).json({
        status: 500,
        message: "Internal Server Error"
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
  
