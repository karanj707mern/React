// authorize.js: middleware factory to restrict routes by role(s)
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    const userRole = req.user.role || 'user';
    if (allowedRoles.includes(userRole)) return next();
    return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
  }
}

module.exports = authorize;
