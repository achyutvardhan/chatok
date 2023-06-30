const jwt = require('jsonwebtoken');
const { User,Message } = require('../database/db');
require('dotenv').config();

const sendingMessage = async(req, res) => {
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
      // console.log(UserRole)

       // store messsage 
        const message  = req.body;
        const storeMessage = new Message({
          sender_id : UserRole._id,
          content:{
            type: message.type,
            data : message.data,
          },         
        });
        await storeMessage.save();
        res.status(201).json({ message: `${UserRole._id} message was sent` });

    } catch (error) {
      console.error('Error accessing protected route:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  }


  exports.sendingMessage = sendingMessage;