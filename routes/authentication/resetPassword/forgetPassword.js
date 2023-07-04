const express =  require('express')
const router = express.Router();
const {forgetPassword}  =require('../../../controller/forgetpassword')

router.post('/forgetpassword',forgetPassword);

module.exports = router;