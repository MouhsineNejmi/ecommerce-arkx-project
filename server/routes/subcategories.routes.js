const express = require('express');
const router = express.Router();

const {
    createNewSubCategory,
    listAllSubCategories,
    GetSubCategoryByID,
    searchSubCategories,
    updateSubCategoryData,
    deleteSubCategory
} = require('../controllers/subcategories.controller');

router.post('/' , createNewSubCategory);
router.get('/', searchSubCategories);
router.get('/', listAllSubCategories);
router.get('/:id', GetSubCategoryByID);
router.put('/:id', updateSubCategoryData);
router.delete('/:id', deleteSubCategory)

module.exports = router;
