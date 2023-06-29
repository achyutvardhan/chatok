const jwt = require('jsonwebtoken')

// Middleware function to check token expiration
const checkTokenExpiration = (req, res, next) => {
  // Extract the token from the request headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your-secret-key');

    // Check if the token has expired
    if (Date.now() >= decoded.exp * 1000) {
      // Token has expired, update the token in the userSchema
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