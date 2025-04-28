const express =require('express');
const router =express.Router()

const {getalljobs,getjob,creatjob,updatejobs,deletejobs}=require('../controllers/jobs')

router.route('/').post(creatjob).get(getalljobs)
router.route('/:id').get(getjob).delete(deletejobs).patch(updatejobs)

module.exports=router;