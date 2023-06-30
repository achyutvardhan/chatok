const jwt = require('jsonwebtoken');
const { User,Message,UserDetails } = require('../database/db');
require('dotenv').config();

const readMessages = async(req, res) => {
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
      if(UserRole.role=='admin')
      {
          const sentMessage =  await Message.find({sender_id:UserRole._id});
          const readmessages = await Message.find({
            $nor:[{
                sender_id:UserRole._id,
            }]
          }) ;
          for (let index = 0; index < sentMessage.length; index++) {
            const id = sentMessage[0]._id;
            
            
          }
         console.log(sentMessage + "sentMesaage")
         console.log(readmessages + "readmessages")
         res.status(200).json({sentMessage, readmessages})
      }else{
        const messagesRead = await Message.find();
        res.status(200).json({messagesRead});
      }
       

    } catch (error) {
      console.error('Error accessing protected route:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  }


  exports.readMessages = readMessages;