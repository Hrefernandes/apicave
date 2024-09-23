const { default: mongoose } = require('mongoose');
const Category = require('../models/category.model');
module.exports.getAllCategories = [
    async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }];

module.exports.createCategory = [
    async (req, res) => {
        try {
            const categ = await Category.findOne({ label: req.body.label }).exec();
            if (categ !== null) {
                return res.status(400).json({ message: 'cette catégorie existe déjà' });
            }
            const category = await Category.create(req.body);
            res.status(201).json(category);
        } catch (error) {
            if (error.name === 'ValidationError') {
                // Capture l'erreur de validation de Mongoose et retourne une réponse 400
                return res.status(400).json({ message: error.message });
            } else {
                console.log(error.stack);
                return res.status(500).json({ message: error.message });
            }
        }
    }
];
module.exports.deleteCategory = [
    async (req, res) => {
        const id = req.params.id;
        try {
            const category = await Category.findById(id);
            if (category === null) {
                return res.status(404).json({ message: "Cette catégorie n'existe pas" });
            } else {
                await category.deleteOne({ '_id': id });
                res.status(200).json({ message: `Vin supprimé: ${id}` });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log(error.stack);
        }
    }
];



