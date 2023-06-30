const jwt = require('jsonwebtoken');
const { User } = require('../database/db');
require('dotenv').config();

const checkAdmin = async(req, res,next) => {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
     console.log(decoded)
      //role finder response
      const UserRole = await User.findById(decoded.userId);
      if(UserRole.role == 'admin'){
      next()
    }
      else
      return res.status(400).json({message: "user is not authorised"})
    //   res.status(200).json({ message: 'Protected route accessed successfully' });
    } catch (error) {
      console.error('Error accessing protected route:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  }


  exports.checkAdmin = checkAdmin;