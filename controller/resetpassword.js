const {User,Passcode} = require('../database/db')
const bcrypt =  require('bcrypt')

const resetPassword = async(req,res)=>{

    try {
        const {email, newPassword} = req.body;
        const user  =  await User.findOne({email:email});
        if(!user){
       return res.status(404).json({ message: 'User not found' }); }
        const find = await Passcode.findOne({email:email,code_type:'reset'});
        if(!find){
            return res.status(404).json({ message: 'User reset request not found' }); }
       // password hasing
       const saltRounds = 10;
        const salt =  await bcrypt.genSalt(saltRounds);
        const hashPassword  = await bcrypt.hash(newPassword,salt);
        user.password = hashPassword;
        await user.save();
        const deletePass  = await Passcode.deleteOne({email:email, code_type: "reset"})
        if(deletePass)
        console.log("passcode deleted")
        else
        console.log("passcode not deleted")
        const mail = {
            to : email,
            subject : `Password changed `,
            text : `Your password has changed successfully`
           };
           console.log(await sendMail(mail));
        res.status(200).json({message: "New password saved "});

    } catch (error) {
        console.error('Error accessing reset Password routes:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

exports.resetPassword =resetPassword;