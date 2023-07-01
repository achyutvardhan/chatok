const jwt = require('jsonwebtoken')
const {UserDetails} = require('../database/db')
const {validationResult}  =require('express-validator')
require('dotenv').config();

const editProfile = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors : errors.array()})
    }
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

      // Fetch user details from the database based on the decoded userId
         console.log(decoded)
      const user = await UserDetails.findOne( {user_id:decoded.userId});
      if(!user)
      {
      return res.status(404).json({ message: 'user not found' });

      }
      const data = req.body;
      user.full_name = data.full_name?data.full_name : user.full_name;
      user.age = data.age?data.age : user.age;
      user.profession = data.profession?data.profession : user.profession;
      user.father_name = data.father_name?data.father_name : user.father_name;
      user.marital_status = data.marital_status?data.marital_status : user.marital_status;
      user.marital_date = data.marital_date?data.marital_date : user.marital_date;
      user.phone_no = data.phone_no?data.phone_no : user.phone_no;
      user.alt_phone_no = data.alt_phone_no?data.alt_phone_no : user.alt_phone_no;
      user.gender = data.gender?data.gender : user.gender;
      res.status(200).json({ message: 'Protected route accessed successfully' });
    } catch (error) {
      console.error('Error accessing protected route:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  }


  exports.editProfile = editProfile;