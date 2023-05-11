const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication failed: Unauthorized" });
  }

  try {
    jwt.verify(token, process.env.token);

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Authentication failed: invalid token" });
  }
};

module.exports = authenticate;
