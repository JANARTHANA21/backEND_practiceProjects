const customapierror = require("../errors/customapierror")
const { StatusCodes } = require('http-status-codes')

const errorhandlermiddleware=(err,req,res,next)=>{
    if(err instanceof customapierror){
        return res.status(StatusCodes.StatusCodes).json({msg:err.message});
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('something went wrong');
}
module.exports=errorhandlermiddleware;