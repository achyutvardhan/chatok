const express =  require('express');
const router = express.Router()
const {checkTokenExpiration} = require('../../../middleware/checkTokenExpiration')
const {sendingMessage} = require('../../../controller/sendingMessage')
const {checkAdmin} = require('../../../middleware/checkAdmin')
const {readMessages} = require('../../../controller/readMessages');
const { deleteMessage } = require('../../../controller/deleteMessage');
router.use(checkTokenExpiration)

// router.get('/protected',protected );  


router.post('/sendingMessage',checkAdmin,sendingMessage );  
router.get('/readMessages',readMessages );  
router.delete('/deleteMessage',checkAdmin,deleteMessage)

module.exports = router