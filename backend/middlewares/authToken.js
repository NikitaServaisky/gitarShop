const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  console.log('Incoming Headers:', req.headers);
  console.log('Authorization Header:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: 'Access Denied: No Authorization header provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    res.status(403).json({ message: 'Invalid Token' });
  }
};

module.exports = authenticateToken;
