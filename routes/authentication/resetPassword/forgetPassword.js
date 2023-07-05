const express =  require('express')
const router = express.Router();
const {forgetPassword}  =require('../../../controller/forgetpassword')
const {resetPassword} = require('../../../controller/resetpassword')
const {verify} = require('../../../controller/passcodeVerify')

router.post('/forgetpassword',forgetPassword);
router.post('/passwordverify',verify);
router.post('/resetpassword',resetPassword);

module.exports = router;