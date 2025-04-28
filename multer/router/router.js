const router=require('express').Router();
const cloudinary=require('../middleware/cloudinary');
const upload=require("../middleware/multer");
const user=require('../model/index')
router.post('/',upload.array('image'),async(req,res)=>{
    try {
        let array=[]
        for (let i = 0; i < req.files.length; i++) {
            const filesave=await cloudinary.uploader.upload(req.files[i].path)
            try {
                let metadata=await new user({
                    name:`${req.body.name}${i}`,
                    avatar:filesave.secure_url,
                    cloudinary_id:filesave.public_id
                }).save();
                array.push(metadata);
            } catch (error) {
                console.log(error.message);
                
            }
            
        }

        res.json(array); 
    } catch (error) {
        console.log(error.message);
    }
})
module.exports=router;