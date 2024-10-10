const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.login = async (req, res, next) => {
  try {
    // On récupère les infos de connexion et on vérifie qu'elles sont renseignées
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Echec de l'authentication" });
    }
    // On authentifie l'utilisateur
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
      return res.status(401).json({ message: "Echec de l'authentication" });
    }
    // On vérifie le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Echec de l'authentication" });
    }
    // On génère le JWT
const accessToken = jwt.sign(
  {
  userId: user._id,
  username: user.username
  },
  process.env.SECRET_TOKEN,
  {
  algorithm: process.env.TOKEN_ALGORITHM,
  audience: process.env.TOKEN_AUDIENCE,
  expiresIn: process.env.TOKEN_EXPIRES_IN / 1000,
  issuer: process.env.TOKEN_ISSUER,
  subject: user._id.toString()
  }
  );
  /* On envoie le JWT au client ainsi que le type et la date d’exiration */
  return res.status(200).json({
  accessToken,
  tokenType: process.env.TOKEN_TYPE,
  accessTokenExpiresIn: process.env.TOKEN_EXPIRES_IN,
  });
  } catch (err) {
    res.status(500).json({ error: "Erreur interne" });
    console.log(err.stack);
  }
};
