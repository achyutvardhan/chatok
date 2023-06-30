const express =  require('express');
const router = express.Router()
const {protected} = require('../../../controller/Protected')
const {checkTokenExpiration} = require('../../../middleware/checkTokenExpiration')
const {sendingMessage} = require('../../../controller/sendingMessage')
const {checkAdmin} = require('../../../middleware/checkAdmin')
const {readMessages} = require('../../../controller/readMessages')
router.use(checkTokenExpiration)

// router.get('/protected',protected );  


router.post('/sendingMessage',checkAdmin,sendingMessage );  
router.get('/readMessages',readMessages );  


module.exports = router