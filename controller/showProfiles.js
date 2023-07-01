const {UserDetails}=require('../database/db')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const showProfile = async(req, res) => {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

      const users = await UserDetails.find();
      if(users)
      {
        res.status(200).json({users});
      }
      else{
        res.status(404).json('Details fetch error')
      }
      
    } catch (error) {
      console.error('Error accessing protected route:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  exports.showProfile = showProfile;