import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "unauthorize" });
  }
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const { id } = decodedToken;
    req.user = id;
    next();
  } catch (err) {
    return res.status(500).send({ message: "unauthorize" });
  }
};

export default authenticate;
