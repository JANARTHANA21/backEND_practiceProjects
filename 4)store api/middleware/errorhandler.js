

const errorhandler = (err,req,res,next)=>{
    console.log(err);
    
    return res.status(500).json({msg:'something went wrong ,plz try later'})
}
module.exports=errorhandler;