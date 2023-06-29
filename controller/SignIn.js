const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator');
const { User } = require('../database/db');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const signin = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors : errors.array()})
    }
    try {
        const {email,password} = req.body;
        const user =  await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({ message: 'User not found' }); 
        }

        const passwordMatch =  await bcrypt.compare(password,user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
          }
        

        const token = genrateToken(user);
        res.status(200).json({ token });

    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



function genrateToken(user) {
    const token = jwt.sign({uiserId: user._id},process.env.TOKEN_SECRET_KEY,{expiresIn:'1h'});
    return token
}
exports.signin = signin