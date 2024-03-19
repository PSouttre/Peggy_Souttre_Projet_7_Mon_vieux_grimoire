import { jwt } from "jsonwebtoken";

//Middleware qui permet d'extraire les infos contenues ds le token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("")[1];
    // On décode le token
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    //On récupère l'userId de ce token décodé
    const userId = decodedToken.userId;
    //que l'on ajoute à l'objet request qui est transmis aux routes appelées par la suite
    req.auth = {
      userId: userId,
    };
  } catch (error) {
    res.status(401).json({ error });
  }
};
