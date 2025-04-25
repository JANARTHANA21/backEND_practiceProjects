const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpire: {
        type: Date,
        default: null
    }
})
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
    next();
})
userSchema.methods.isPasswordCorrect=async function(findpassword){
    const ismatch=await bcrypt.compare(findpassword,this.password);
    return ismatch
}
userSchema.methods.createaccesstoken= function(){
    return jwt.sign({userId:this._id,username:this.name},process.env.JWT_ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN})
}
userSchema.methods.createrefreshtoken= function(){
    return jwt.sign({userId:this._id,username:this.name},process.env.JWT_REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN})
}
userSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();
    if (update.password) { // Check if password is being updated
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password, salt);
    }
    next();
});
module.exports=mongoose.model('details',userSchema);
