const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
    todo:{
        require:true,
        type:String
    }
});
module.exports=new mongoose.model('todos',todoSchema);