const express = require('express')
const app =  express()
const cors = require('cors')

app.use(cors());

app.get('*',(req,res)=>{
    res.send("page doesn't exist");
})

app.listen(8000, ()=>{
    console.log("listening to port 8000...")
})