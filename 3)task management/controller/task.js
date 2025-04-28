const tasks=require('../model/task')
const asyncwrapper=require('../middleware/async');
const {createCustomError}=require('../errors/customerroe')
const getallTask=asyncwrapper(async(req,res)=>{
        const task=await tasks.find();
        res.status(201).json({task})
})

const createTask = asyncwrapper(async (req, res) => {
        const data = await tasks.create(req.body);
        res.status(201).json({ data });

});
const getTask=asyncwrapper(async(req,res)=>{

      const {id:taskid}= req.params
      const find=await tasks.findOne({_id:taskid})
      res.status(200).json(find);
      if(!find){
        return createCustomError({msg:`no task with id ${taskid}`},404);
        // return res.status(400).json({msg:`no task with id ${taskid}`});

      }

})
const updateTask=asyncwrapper(async(req,res)=>{

        const {id:taskid}= req.params
        const find=await tasks.findOneAndUpdate({_id:taskid},req.body)
        res.status(200).json(find);
        if(!find){
        return createCustomError({msg:`no task with id ${taskid}`},404);

        //   res.status(400).json({msg:`no task with id ${taskid}`});
        }

})
const deleteTask=asyncwrapper(async(req,res)=>{
        const {id:taskid}= req.params
        const find=await tasks.findOneAndDelete({_id:taskid})
        res.status(200).json(find);
        if(!find){
        return createCustomError({msg:`no task with id ${taskid}`},404);

        //   res.status(400).json({msg:`no task with id ${taskid}`});
  
        }

});


module.exports={
    getallTask,
    createTask,
    getTask,
    updateTask,
    deleteTask
}