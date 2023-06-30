const jwt = require('jsonwebtoken')
require('dotenv').config();
const { User,Message,UserDetails } = require('../database/db');

const deleteMessage = async(req, res) => {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

        //  console.log(decoded)
    const data = req.body;
    // console.log(data.sender_id)
    if (data.sender_id == decoded.userId) {
        const deletedMessages = await Message.findByIdAndDelete(data._id);
        if(deletedMessages)
        res.status(200).json({ message: 'message deleted' });
        else{
        res.status(404).json({ message: 'message not found' });

        }
    }
    else{
        res.status(400).json({ message: 'User not authorised' });
    }

    } catch (error) {
      console.error('Error accessing protected route:', error);
      res.status(500).json({ message: 'Inernal server error' });
    }
  }


  exports.deleteMessage =deleteMessage;