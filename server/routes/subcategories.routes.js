const express = require('express');
const router = express.Router();
const { model } = require('mongoose');

const {
    createNewSubCategory,
    listAllSubCategories,
    GetSubCategoryByID,
    searchSubCategories,
    updateSubCategoryData,
    deleteSubCategory
} = require('../controllers/subcategories.controller');

router.post('/' , createNewSubCategory);
router.get('/', listAllSubCategories);
router.get('/', GetSubCategoryByID);
router.get('/', searchSubCategories);
router.put('/', updateSubCategoryData);
router.delete('/', deleteSubCategory)

module.exports = router;