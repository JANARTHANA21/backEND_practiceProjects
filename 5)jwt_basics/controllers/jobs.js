const getalljobs =(req,res)=>{
    res.send('get all jobs')
}
const getjob =(req,res)=>{
    res.send('get  jobs')
}
const creatjob =(req,res)=>{
    res.send('create jobs')
}
const updatejobs =(req,res)=>{
    res.send('update jobs')
}
const deletejobs =(req,res)=>{
    res.send('delete jobs')
}
module.exports={getalljobs,getjob,creatjob,updatejobs,deletejobs}