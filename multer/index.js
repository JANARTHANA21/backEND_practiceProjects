require('dotenv').config();
const express=require('express');
const multer=require('multer');
const path=require('path');
const routing=require('./router/router');
const { default: mongoose } = require('mongoose');
const app=express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.json());

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname.replace(/(\.[^/.]+)$/g,"")+"_"+ Date.now()+path.extname(file.originalname))
    }
})
const upload =multer({
    storage:storage,
    limits:{
    fileSize:parseInt(2 * 1000 *1000),
    },
    fileFilter:(req,file,cb)=>{
        const fileformatetets=/jpeg|jpg|png/;
        const mimetype=fileformatetets.test(file.mimetype) //file.mimetype will be "image/png", so:
        const fileformate=fileformatetets.test(path.extname(file.originalname).toLowerCase()) 
        if (mimetype && fileformate){
            return cb(null,true)
        }
        cb("Error only supports following fileformates jpeg or jpg or png ")
    }

}).single('pic')
app.get('/',(req,res)=>{
    res.render(path.join(__dirname,'views','jack.ejs'))
})
app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if (err) {
            req.send(err)
        }else{
        res.send("sucessfully uploaded")
        }
    })

})
app.use('/user',routing);
app.use('/mail',require('./router/mail'))
async function  start() {
    await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("database is connected")).catch((err)=>console.log(err.message))
    app.listen(8000,()=>console.log("runnning...."))
}
start();