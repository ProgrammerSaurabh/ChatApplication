const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const authMiddleware = async (req, res, next) => {
  if (!"authorization" in req.headers) {
    res.send(500).json({ message: "Authorization is required in headers" });
  }

  if (!req.headers.authorization.startsWith("Bearer")) {
    res.send(500).json({ message: "Authorization is required in headers" });
  }

  let { authorization: token } = req.headers;
  token = token.split(" ").pop();

  if (!token) {
    res.send(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      res.send(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.send(500).json({ message: "Something went wrong" });
  }
};

module.exports = authMiddleware;
