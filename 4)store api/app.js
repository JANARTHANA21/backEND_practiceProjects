require('dotenv').config()
require('express-async-errors')
const express=require('express');
const notfound = require('./middleware/notfound');
const errorhandler = require('./middleware/errorhandler');
const coonect = require('./model/db');
const router = require('./routers/router');

const app=express();
const PORT=9000;

app.get('/',(req,res)=>{
    res.send('<h1>jana</h1><a href="/api/v1/products">products route</a>')
})

app.use(express.json());
app.use('/v1/products',router);
app.use(errorhandler);
app.use(notfound);

const start=async()=>{
try {
    await coonect(process.env.MONGO_URI)
    app.listen(PORT,()=>{console.log(`running in ${PORT}`)})
} catch (error) {
    console.error(error.message)  
}
}
start();