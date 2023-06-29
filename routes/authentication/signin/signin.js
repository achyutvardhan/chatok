const express = require('express')
const router = express.Router();
const {body} = require('express-validator')
const {signin} =  require('../../../controller/SignIn')
router.post('/signin',[
    body('email').isEmail().withMessage('Invalid Email address'),
    body('password').isEmpty().withMessage('Password is required')
],signin)

module.exports = router