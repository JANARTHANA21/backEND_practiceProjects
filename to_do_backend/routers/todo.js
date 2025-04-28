const todorouter=require('express').Router();
const todoSchema=require('../models/index');

todorouter.post('/add/todos',async(req,res)=>{
    const {todos}=req.body;
    const newtodo=new todoSchema({
        todo:todos
    });
    try {
        await newtodo.save();
    console.log("todo saved");
    res.redirect('/');
    
    } catch (error) {
        console.log(`messaage:${err.messaage}`);
        res.status(500).send('Error saving todo');
    }
})
.get("/delete/todos/:_id", async(req, res) => {
    try {
      const {_id} = req.params;
      await todoSchema.deleteOne({ _id });
      console.log("deleted sucessfully");
      res.redirect("/");
    } catch (err) {
      console.log(`messaage:${err.messaage}`);
    }
  });

module.exports=todorouter;