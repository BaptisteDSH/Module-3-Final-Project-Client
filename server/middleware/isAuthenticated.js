const jwt = require("jsonwebtoken");

// Example middleware to protect routes on the server.
// It expects the Authorization header in the format: 'Bearer <token>'
module.exports = function isAuthenticated(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Malformed token" });

    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    // Attach user info to the request so routes can use req.user
    req.user = payload;
    next();
  } catch (err) {
    // Forward error to the global error handler
    next(err);
  }
};
