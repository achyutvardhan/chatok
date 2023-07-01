const express =  require('express');
const router = express.Router()
const {checkTokenExpiration} = require('../../../middleware/checkTokenExpiration')
const {sendingMessage} = require('../../../controller/sendingMessage')
const {checkAdmin} = require('../../../middleware/checkAdmin')
const {readMessages} = require('../../../controller/readMessages');
const { deleteMessage } = require('../../../controller/deleteMessage');
const {showProfile} = require('../../../controller/showProfiles')
router.use(checkTokenExpiration)

// router.get('/protected',protected );  


router.post('/sendingMessage',checkAdmin,sendingMessage );  
router.get('/readMessages',readMessages );  
router.delete('/deleteMessage',checkAdmin,deleteMessage)

// show profiles
router.get('/showProfiles',checkAdmin,showProfile);

module.exports = router