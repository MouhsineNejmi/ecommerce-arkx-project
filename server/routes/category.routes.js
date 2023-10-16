const express = require('express');
const router = express.Router();

const {
    createNewCategory,
    listAllCategories,
    searchCategories,
    getCategoryByID,
    updateCategoryData,
    deleteCategory
} = require('../controllers/category.controller')

router.post('/', createNewCategory);
router.get('/', listAllCategories);
router.get('/', searchCategories);
router.get('/:id', getCategoryByID);
router.put('/:id', updateCategoryData);
router.delete('/:id', deleteCategory);

module.exports = router;
