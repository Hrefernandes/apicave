const express = require('express');
const router = express.Router();
// Route GET /wines/
router.get("/", (req, res) => {
    res.status(200).json({ "message": "voici la liste des vins" });
})
// Route GET /wines/{id}
router.get("/:id", (req, res) => {
    res.status(200).json({ "message": "détail du vin " + req.params.id });
})
module.exports = router;

