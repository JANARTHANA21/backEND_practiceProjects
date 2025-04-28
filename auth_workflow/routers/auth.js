const router=require('express').Router();
const {login,register,resetPassword,resetpass}=require('../controllers/auth');
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/resetPassword').post(resetPassword)
router.route('/resetPass').post(resetpass)
module.exports=router;