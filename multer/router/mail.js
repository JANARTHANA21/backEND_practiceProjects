const router =require('express').Router();
const {testmail,originalmail}=require('../controllers/mailchecking')
router.get('/user/testmail',testmail).get('/user/originalmail',originalmail);
module.exports=router;