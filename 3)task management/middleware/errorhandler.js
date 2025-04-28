const { CustomAPIError } = require("../errors/customerroe");

const errorhandler=(err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        return res.status(err.status).json({msg:err.message})

    }
    return res.status(500).json({msg:`something went wrong`})
}
module.exports=errorhandler;