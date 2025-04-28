const { getitem, getitemstatic } = require('../controllers/controller');

const router=require('express').Router();

router.route('/').get(getitem)
router.route('/static').get(getitemstatic)
module.exports=router;