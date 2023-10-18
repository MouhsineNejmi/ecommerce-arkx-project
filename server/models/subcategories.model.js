const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subCategoriesSchema = new Schema({
  subcategory_name: {
    type: String,
    unique: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
  },
  active: {
    type: Boolean,
    status: false,
  },
});

const SubCategories = model("SubCategories", subCategoriesSchema);
module.exports = SubCategories;
