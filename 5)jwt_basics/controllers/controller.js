const jwt = require('jsonwebtoken')
const { badrequest } = require('../errors')

const login=(req,res)=>{
    const {username,pasword}=req.boby;
    if( !username || !pasword){
        throw new badrequest("Please provide email and password");
        
    }
    const id = new Date().getDate()
    const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(200).json({ msg: 'user created', token })
}
const board=(req,res)=>{
    const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}
module.exports={login,board}