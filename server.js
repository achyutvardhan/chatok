const express = require('express')
const app =  express()
const cors = require('cors')
const mongoose =  require('mongoose')
const {User,Message,UserDetails} = require('./database/db')
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/chatok");

const db = mongoose.connection;
db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  db.once('open',()=>{
    console.log("Connected to mongodb")
  })



app.get('*',(req,res)=>{
    res.send("page doesn't exist");
})

app.listen(8000, ()=>{
    console.log("listening to port 8000...")
})