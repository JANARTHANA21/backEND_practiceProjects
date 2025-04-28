const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const uniqueValidator = require('mongoose-unique-validator');
const jwt=require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
});

// Hash password before saving the user document
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// UserSchema.plugin(uniqueValidator, { message: '{PATH} already exists. Please use a different one.' });


UserSchema.methods.JWTfunction=function(){
  return jwt.sign({userid:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
UserSchema.methods.checkcorrectpassword=async function(canditatepass){
  const jana=await bcrypt.compare(canditatepass,this.password)
  return jana
}
// Export the model with the name 'User'
module.exports = mongoose.model('User', UserSchema);