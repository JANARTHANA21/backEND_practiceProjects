require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const app=express();

app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routers/index'));
app.use(require('./routers/todo'))

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log("databse is connect")
  }).catch((err)=>{
    console.log(`messaage:${err.messaage}`);
  })
app.listen(9000,()=>console.log("connected with 9k"))
