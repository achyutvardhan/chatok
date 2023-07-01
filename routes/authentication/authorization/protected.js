const express =  require('express');
const router = express.Router()
const {body} =require('express-validator')
const {checkTokenExpiration} = require('../../../middleware/checkTokenExpiration')
const {sendingMessage} = require('../../../controller/sendingMessage')
const {checkAdmin} = require('../../../middleware/checkAdmin')
const {readMessages} = require('../../../controller/readMessages');
const { deleteMessage } = require('../../../controller/deleteMessage');
const {showProfile} = require('../../../controller/showProfiles')
const {editProfile} =require('../../../controller/editProfile')
router.use(checkTokenExpiration)

// router.get('/protected',protected );  


router.post('/sendingMessage',checkAdmin,sendingMessage );  
router.get('/readMessages',readMessages );  
router.delete('/deleteMessage',checkAdmin,deleteMessage)
router.put('/edit/profile',[
    body('marital_status').isIn(['married', 'unmarried']).withMessage('Invalid marital status'),
    body('phone_no').isMobilePhone().withMessage('Invalid phone number'),
    body('registration_no').notEmpty().withMessage('Registration Number is required'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
    body('profession').isIn(['Advocate', 'CA']).withMessage('Invalid profession'),
],editProfile)
// show profiles
router.get('/showProfiles',checkAdmin,showProfile);

module.exports = router