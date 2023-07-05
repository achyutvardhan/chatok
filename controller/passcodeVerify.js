const {User,Passcode} = require('../database/db')


const verify = async(req,res)=>{
try {
    const {email,code} = req.body;
    const user  =  await User.findOne({email:email});
    if(!user){
    return res.status(404).json({ message: 'User not found' }); }
    const passcode = await Passcode.findOne({email:email});
    if (!passcode || passcode.code !== code || Date.now() > passcode.expiration) {
        return res.status(400).json({ message: 'Invalid or expired passcode' });
      }

        res.status(200).json({message : 'passcode verified'});
    

} catch (error) {
    console.error('Error accessing verify routes:', error);
      res.status(500).json({ message: 'Internal server error' });
}
}


exports.verify = verify;