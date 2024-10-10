const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const connectDB = require('./app/config/db');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Instancie un objet express
const app = express();

// Configure cors
const corsConfig = {
  origin: ['https://localhost', 'https://macavavin'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsConfig));

// Connexion à la base de données
connectDB();

// Pour pouvoir parser les requêtes avec content-type=application/json
app.use(express.json());

// Définit les routes
app.use('/wines', require('./app/routes/wine.routes'));
app.use('/categories', require('./app/routes/category.routes'));
app.use('/', require('./app/routes/user.routes'));

/* Récupère la clé privée et le certificat */
const key = fs.readFileSync(path.join(__dirname, 'certificate', 'apicave.key'));
const cert = fs.readFileSync(
  path.join(__dirname, 'certificate', 'apicave.pem')
);
const options = { key, cert };

// Met le serveur en écoute sur le port défini
https.createServer(options, app).listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
