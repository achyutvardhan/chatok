const express =  require('express');
const router = express.Router()
const {protected} = require('../../../controller/Protected')
const {checkTokenExpiration} = require('../../../middleware/checkTokenExpiration')
const {sendingMessage} = require('../../../controller/sendingMessage')
const {checkAdmin} = require('../../../middleware/checkAdmin')
router.use(checkTokenExpiration)

router.get('/protected',protected );  


router.get('/sendingMessage',checkAdmin,sendingMessage );  


module.exports = router