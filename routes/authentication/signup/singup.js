const express = require('express')
const  router = express.Router();
const {body} =  require('express-validator');
const { singup } = require('../../../controller/signUp');

router.post('/signup',[
  body('password').notEmpty().withMessage('Password is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('full_name').notEmpty().withMessage('Full name is required'),
  body('age').isInt().withMessage('Age must be a number'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('profession').isIn(['Advocate', 'CA']).withMessage('Invalid profession'),
  body('father_name').notEmpty().withMessage('Father name is required'),
  body('marital_status').isIn(['married', 'unmarried']).withMessage('Invalid marital status'),
  body('phone_no').isMobilePhone().withMessage('Invalid phone number'),
  body('registration_no').notEmpty().withMessage('Registration Number is required'),
],singup)


module.exports =router