const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

// Usage:
// - For public route: don't use middleware.
// - For authenticated route (any role): use `auth()`.
// - For role-restricted route: use `auth('admin')` or `auth(['admin','editor'])`.
module.exports = function(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : (req.headers['x-access-token'] || req.query.token);
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      if (requiredRole) {
        const allowed = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        const userRole = decoded.role || 'user';
        if (!allowed.includes(userRole)) return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}
