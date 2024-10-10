const express = require('express');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

const { getAllWine, createWine , deleteWine, updateWine, searchWines } = require('../controllers/wine.controller');

router.get("/", auth , getAllWine);
router.get("/:category", auth, searchWines);
router.delete("/:id", auth, deleteWine);  
router.put("/:id", auth, updateWine);
router.post("/", auth, createWine);


module.exports = router;

