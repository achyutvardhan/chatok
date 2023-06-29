const express =  require('express');
const router = express.Router()
const {protected} = require('../../../controller/Protected')

router.get('/protected',protected );  

module.exports = router