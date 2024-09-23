const express = require('express');
const PORT = process.env.PORT || 3000; 
const connectDB = require('./app/config/db');

//Instancie un objet express
const app = express();

// Connexion à la base de données
connectDB();

// Pour parser les requêtes avec content-type=application/json
app.use(express.json());


app.use("/wines", require('./app/routes/wine.routes'));
app.use("/categories", require('./app/routes/categorie.route'));

// Met le serveur en écoute sur le port défini
app.listen(PORT, () => {
console.log("Server running on port " + PORT)
})
