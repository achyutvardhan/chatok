const express = require('express')
const app =  express()
const cors = require('cors')
const mongoose =  require('mongoose')
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://achyutvardhan:dUXPEufe4d5BtIgr@cluster0.cta42v1.mongodb.net/chatok");

const db = mongoose.connection;
db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  db.once('open',()=>{
    console.log("Connected to mongodb")
  })

  //**********************Sing In*****************************
  app.use('/',require('./routes/authentication/signin/signin'))

  //**********************Sing Up*****************************
  app.use('/',require('./routes/authentication/signup/singup'))

  //**********************authorization*****************************
  app.use('/', require('./routes/authentication/authorization/protected'))

  //**********************Forget Password*****************************
  app.use('/',require('./routes/authentication/resetPassword/forgetPassword'))

app.get('*',(req,res)=>{
    res.send("page doesn't exist");
})

app.listen(8000, ()=>{
    console.log("listening to port 8000...")
})