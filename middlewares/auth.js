import jwt from "jsonwebtoken";
import { User } from "../models/usersModel.js";
import "dotenv/config";

const { SECRET_KEY } = process.env;

const authenticateToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    console.log("Invalid authorization format or missing token");
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    console.log("Verifying token...");

    const { id } = jwt.verify(token, SECRET_KEY);
    console.log("Token verified, user ID:", id);

    const user = await User.findById(id);
    if (!user || user.token !== token || !user.token) {
      console.log("User not found or token mismatch");
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    console.log("User authenticated successfully:", user.email);
    next();
  } catch (err) {
    console.log("Error verifying token:", err.message);

    return res.status(401).json({ message: "Not authorized" });
  }
};

export { authenticateToken };
