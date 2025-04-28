require('dotenv').config();
require('express-async-errors');

const express=require('express');
const Routes = require('./routers/route');
const notFound = require('./middlewares/not-found');
const app=express();

port=2000
app.get('/',(req,res)=>{
    res.send('jana')
})

app.use(express.json())
app.use('/v1/app',Routes)


app.use(notFound);




try {
    app.listen(1000,()=>{console.log('port is runnning in 1000');
    })
    
} catch (error) {
    console.log({msg:error.message});
}