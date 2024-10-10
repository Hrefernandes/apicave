const express = require('express');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

const { getAllCategories, createCategory , deleteCategory } = require('../controllers/category.controller');
router.get("/", auth,  getAllCategories);
router.post("/", auth, createCategory);
router.delete("/:id", auth, deleteCategory);  

module.exports = router;