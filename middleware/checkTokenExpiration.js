const jwt = require('jsonwebtoken')
const {User}= require('../database/db')
require('dotenv').config()
// Middleware function to check token expiration
const checkTokenExpiration = (req, res, next) => {

  if (req.path === '/forgetpassword'|| req.path === '/passwordverify' || req.path === '/resetpassword') {
    return next(); // Skip middleware for the forgot password route
  }
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (Date.now() >= decoded.exp * 1000) {
      User.findByIdAndUpdate(decoded.userId, { token: null }, (err) => {
        if (err) {
          console.error('Error updating token:', err);
        }
      });
    }

    // Attach the decoded token to the request object
    req.decodedToken = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.checkTokenExpiration = checkTokenExpiration;