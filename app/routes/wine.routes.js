const express = require('express');
const router = express.Router();

const { getAllWine, createWine , deleteWine, updateWine, searchWines } = require('../controllers/wine.controller');

router.get("/", getAllWine);
router.get("/:category", searchWines);
router.delete("/:id", deleteWine);  
router.put("/:id", updateWine);
router.post("/", createWine);


module.exports = router;

