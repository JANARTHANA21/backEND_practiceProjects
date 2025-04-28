require('dotenv').config();
const routers=require('./routers');
const mongoose= require('mongoose');
const express=require('express');
const bodyparser=require('body-parser');
const mongoString=process.env.DATABASE_URL;
const app=express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());

mongoose.connect(mongoString);
const database=mongoose.connection;
database.on('error',(err)=>{console.log(err);});
database.on('connected',()=>{console.log("databae id connected");});

app.use("/api",routers);




app.listen(3000,()=>{console.log('server is running');});

