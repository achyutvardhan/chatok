const {validationResult} = require('express-validator')
const {User,UserDetails} = require('../database/db')
const bcrypt = require('bcrypt')
const {v4 : uuidv4} = require('uuid')

const singup = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors : errors.array()})
    }
    try {
        const {password,email,alt_email,full_name,age, gender,father_name, marital_status,marital_date,phone_no, alt_phone_no, profession} =req.body;
        const existingUser = await User.findOne({email});
        if(existingUser)
        {
           return res.status(409).json({message: 'Username already exists'});
        }

        //unique id generation
        const userid =  uuidv4();

        //password hasing
        const saltRounds = 10;
        const salt =  await bcrypt.genSalt(saltRounds);
        const hashPassword  = await bcrypt.hash(password,salt);

        // create user 
        const user = new User({
            id_no: userid,
            password : hashPassword,
            email : email,
            alt_email : alt_email,
        });
        
        const userdetails = new UserDetails({
            user_id: user._id,
            full_name,
            age,
            gender,
            profession,
            father_name,
            marital_status,
            marital_date,
            phone_no,
            alt_phone_no,
        })
        
       await user.save();
       await userdetails.save();
       res.status(201).json({ message: 'User created successfully' });


    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.singup = singup;