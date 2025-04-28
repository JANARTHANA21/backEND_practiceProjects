const {getallTask,createTask,getTask,updateTask,deleteTask } = require('../controller/task');

const router=require('express').Router();

router.route('/')
.get(getallTask)
.post(createTask)

router.route('/:id')
.get(getTask)
.patch(updateTask)
.delete(deleteTask)


module.exports=router;