import JWT from "jsonwebtoken";
import { User } from "../databse/db.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.Cookie || req.headers.authorization) {
    token = req.headers.authorization;
  } else if (req.cookies && req.cookies) {
    token = req.cookies.authorization;
  }
  if (!token)
    return res
      .status(401)
      .json({ message: "Not authorized, No Token provided" });

  try {
    const decode = JWT.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Not authorized, invalid token", error: err });
  }
};
