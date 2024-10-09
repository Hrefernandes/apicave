const mongoose = require("mongoose");
const Category = require("../models/category.model");
const CategorySchema = require("mongoose").model("Category").schema;
const wineSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: CategorySchema,
        default: {},
      },
    ],
    grape_variety: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "wines",
  }
);
module.exports = mongoose.model("Wine", wineSchema);
