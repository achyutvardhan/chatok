const {User,Passcode} = require('../database/db')
const {sendMail} = require('../mail/mailer')


const deletePasscodeAfterDelay = (email,Type, delay) => {
    setTimeout(() => {
        Passcode.deleteOne({ email: email, code_type: Type}, (err) => {
            if (err) {
              console.error('Error deleting document:', err);
              // Handle the error
            } else {
              console.log('Document deleted successfully');
              // Handle the success
            }
          });
    }, delay);
  };

  
const forgetPassword = async(req,res)=>{
   try {
      const email = req.body;
      const user = await User.findOne({email:email});
      if(!user)
      {
       return res.status(404).json({ message: 'User not found' }); 
      }
      const passcode  = Math.floor(100000 + Math.random() * 900000);
      const expirationTime = Date.now() + 10 * 60 * 1000;
      const mail = {
        to : email,
        subject : `Password Reset Passcode `,
        text : `your verification pin : ${passcode}`
       };
       console.log(await sendMail(mail));
       
       const Pass = new Passcode({
        email:email,
        passcode,
        reset,
        expirationTime
       })
       await Pass.save();
       deletePasscodeAfterDelay(email,reset, 10 * 60 * 1000);
       res.status(200).json("verification code sent");
   } catch (error) {
    console.error('Error accessing forget Password routes:', error);
      res.status(500).json({ message: 'Internal server error' });
   }
}

exports.forgetPassword = forgetPassword;