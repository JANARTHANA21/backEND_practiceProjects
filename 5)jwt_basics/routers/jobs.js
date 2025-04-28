const express=require('express')
const router=express.Router()

const {getalljobs,getjob,creatjob,updatejobs,deletejobs}=require('../controllers/jobs');
