const { StatusCodes } = require("http-status-codes")
const Job = require("../models/Job")
const { NotFoundError, BadRequestError } = require("../errors")

const getalljobs =async(req,res)=>{
    const jobs=await Job.find({createdBy:req.user.userid}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs,count:jobs.length})
}
const getjob =async (req,res)=>{
    const {user:{userid},params:{id:jobid}}=req
    const job=await Job.findOne({_id:jobid,createdBy:userid})
    if(!job){
        throw new NotFoundError(`no job with id ${jobid}`)
    }
    res.status(StatusCodes.OK).json({job})
}
const creatjob =async (req,res)=>{
    req.body.createdBy=req.user.userid
    const job=await Job.create(req.body) 
    res.status(StatusCodes.CREATED).json({job})
}
const updatejobs =async(req,res)=>{
    const {body:{company,position},user:{userid},params:{id:jobid}}=req
    if(company==='' || position===''){
        new BadRequestError("company and position can't be empty")
    }
    const job=await Job.updateMany({_id:jobid,createdBy:userid},req.body,{new:true,runValidators:true})
    if(!job){
        throw new NotFoundError(`no job with id ${jobid}`);
    }
    
    res.status(StatusCodes.OK).json({job})

}
const deletejobs = async(req,res)=>{
    const{params:{id:jobid}}=req;
    const job=await Job.deleteOne({_id:jobid})
    
    if(!job){
        throw new NotFoundError(`no job with id ${jobid}`);
    }
    res.status(StatusCodes.OK).json("sucessfullydeleted")
}
module.exports={getalljobs,getjob,creatjob,updatejobs,deletejobs}