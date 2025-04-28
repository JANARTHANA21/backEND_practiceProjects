
const express=require('express');
const app=express();
const PORT= process.env.PORT || 1234;
const route=require('./routers/task');
const connectdb=require('./db');
const notfound = require('./middleware/not-found');
const errorhandler = require('./middleware/errorhandler');
require('dotenv').config()
app.get('/',(req,res)=>{
    res.send('jana')
})
app.use(express.json())
app.use('/api/v1/tasks',route)
app.use(notfound)
app.use(errorhandler)


const start=async()=>{
    try {
        await connectdb(process.env.MONGO_URI)
        app.listen(PORT,()=>{console.log(`running in ${PORT}`)});
    } catch (error) {
        console.log(error);
        
    }
}
start()