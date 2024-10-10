const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
1;
async function auth(req, res, next) {
  try {
    const { headers } = req;
    /* 1. On vérifie que le header Authorization est présent dans la requête */
    if (!headers || !headers.authorization) {
      return res
        .status(401)
        .json({ message: "L’entête Authorization est absent" });
    }
    /* 2. On vérifie que le header Authorization contient bien le token */
    const [scheme, token] = headers.authorization.split(" ");
    if (!scheme || scheme.toLowerCase() !== "bearer" || !token) {
      return res.status(401).json({
        message: "Le format de l’entête Authorization est : Bearer token",
      });
    }
    /* 3. On vérifie et on décode le token à l'aide du secret token et de l'algorithme
 utilisé pour le générer */
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN, {
      algorithms: process.env.TOKEN_ALGORITHM,
    });
    /* On vérifie que l'utilisateur présent dans le token existe en bdd */
    const userId = decodedToken.sub;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ message: `L'utilisateur ${userId} n'existe pas` });
    }
    /* On appelle le prochain middleware */
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expiré",
      });
    } else {
      return res.status(401).json({
        message: "Token invalide",
      });
    }
  }
}
module.exports = auth;
