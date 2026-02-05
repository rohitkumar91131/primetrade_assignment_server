const jwt = require('jsonwebtoken');

// 1. Check User ID Cookie
const protect = async (req, res, next) => {
  const token = req.cookies.user_token; // Cookie 1: ID

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no user token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Initialize req.user with just the ID for now
    req.user = { id: decoded.id }; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// 2. Check Role Cookie (New Middleware)
const checkRole = async (req, res, next) => {
  const token = req.cookies.role_token; // Cookie 2: Role

  if (!token) {
    // If role cookie is missing, assume default USER or block access
    req.user.role = 'USER'; 
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user.role = decoded.role; // Add role to req.user object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, role token failed' });
  }
};

module.exports = { protect, checkRole };