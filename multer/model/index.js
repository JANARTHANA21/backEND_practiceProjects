const mongoose=require('mongoose');
const Schema=new mongoose.Schema({
    name:{
        type:String,
    },
    avatar:{
        type:String
    },
    cloudinary_id:{
        type:String
    }
})
module.exports=mongoose.model('upload',Schema);