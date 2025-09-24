const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (process.env.REQUIRE_AUTH !== 'true') return next(); // auth disabled by default
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ status: false, message: 'Missing token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ status: false, message: 'Invalid token' });
  }
};
