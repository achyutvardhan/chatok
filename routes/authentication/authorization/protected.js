const express =  require('express');
const router = express.Router()
const {protected} = require('../../../controller/Protected')
const {checkTokenExpiration} = require('../../../middleware/checkTokenExpiration')
router.get('/protected',checkTokenExpiration,protected );  

module.exports = router