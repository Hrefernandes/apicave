const { default: mongoose } = require("mongoose");
const Wine = require("../models/wine.model");
const Category = require("../models/category.model");

module.exports.createWine = [
  async (req, res) => {
    // Récupère la liste des libellés des catégories
    const labels = req.body.categories.map((cat) => cat.label);
    // Vérifie que les catégories existent effectivement
    const check = await checkCategories(labels, res);
    if (check !== true) {
      return res.status(400).json({ message: "Vin(s) inconnue(s)" });
    }
    try {
      const wine = await Wine.create(req.body);
      res.status(201).json(wine);
    } catch (error) {
      if (error.name === "ValidationError") {
        // Capture l'erreur de validation de Mongoose et retourne une réponse 400
        return res.status(400).json({ message: error.message });
      } else {
        console.log(error.stack);
        return res.status(500).json({ message: error.message });
      }
    }
  },
];

module.exports.deleteWine = [
  async (req, res) => {
    const id = req.params.id;
    try {
      const wine = await Wine.findById(id);
      if (wine === null) {
        return res
          .status(404)
          .json({ message: "Ce vin n'existe pas" });
      } else {
        await category.deleteOne({ _id: id });
        res.status(200).json({ message: `Vin supprimé: ${id}` });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error.stack);
    }
  },
];

module.exports.updateWine = [
  async (req, res) => {
    if (req.body.categories) {
      const labels = req.body.categories.map((cat) => cat.label);
      const check = await checkCategories(labels, res);
      if (check !== true) {
        return res.status(400).json({ message: "Vin(s) inconnue(s)" });
      }
    }
    try {
      const wine = await Wine.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (wine === null) {
        return res.status(404).json({ message: "Ce vin n'existe pas" });
      }
      res.status(200).json(wine);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error.stack);
    }
  },
];

module.exports.searchWines = [
  async (req, res) => {
    try {
      var query = { ...req.query }; // Récupère tous les paramètres de la requête
      if (query.categorie) {
        const labelToFind = query.categorie;
        Reflect.deleteProperty(query, "categorie");
        const wines = await Wine.find(query);
        var filteredWines = wines.filter((w) =>
          w.categories.some((category) => category.label === labelToFind)
        );
        return res.status(200).json(filteredWines);
      }
      const wines = await Wine.find(query);
      res.status(200).json(wines);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error.stack);
    }
  },
];

module.exports.getAllWine = [
  async (req, res) => {
    try {
      const wine = await Wine.find();
      res.status(200).json(wine);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

async function checkCategories(labels, res) {
  for (const label of labels) {
    try {
      const category = await Category.findOne({ label: label }).exec();
      if (!category) {
        return res
          .status(400)
          .json({ message: `Catégorie inconnue: ${label}` });
      }
    } catch (error) {
      console.log(error.stack);
      return false;
    }
  }
  return true; // Toutes les catégories sont trouvées
}
