const {User,Passcode} = require('../database/db')


const resetPassword = async(req,res)=>{

    try {
        
    } catch (error) {
        console.error('Error accessing reset Password routes:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

