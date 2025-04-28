require('dotenv').config()
const express=require('express');
const mongoose=require('mongoose');
const app=express();

app.use(express.json()); // url parser 
const authroute=require('./routers/auth')
const authenthication=require('./middlewares/authenthications')
app.get('/',(req,res)=>{
    res.send('auth workflow')
})


app.use('/auth',authroute)
app.use('/working',authenthication,(req,res)=>{
    res.json({username:req.user.username,TokenNAME:req.user.Token})
})


const start=async()=>{
    try {
        await mongoose.connect(process.env.mongo_uri);
        app.listen(9000,()=>console.log('port is running'))
    } catch (error) {
        console.log(error); 
    }
}
start();