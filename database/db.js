const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id_no: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    alt_email:{
        type: String,
    },
    role:{
      type: String,
      default : "user"
    },
    token:{
      type:String
    }
    // Add other relevant user fields here
  });
  
  // UserDetails Schema
  const userDetailsSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    full_name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    profession:{
        type:String,
        enum:['Advocate','CA'],
        required: true,
    },
    father_name : {
        type: String,
        required: true
    },
    marital_status:{
        type:String,
        enum:['married','unmarried'],
        required: true,
    },
    marital_date:{
        type:Date,
    },
    phone_no: {
        type: Number,
        required: true,
      },
      alt_phone_no:{
        type: Number
      }
    // Add other relevant user details fields here
  });
  
  // Message Schema
  const messageSchema = new mongoose.Schema({
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });
  
  const User = mongoose.model('User', userSchema);
  const UserDetails = mongoose.model('UserDetails', userDetailsSchema);
  const Message = mongoose.model('Message', messageSchema);
  
  // Create models based on the schemas
module.exports = {
  User,UserDetails,Message
}