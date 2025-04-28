const notfound=(req,res)=>{
    res.status(404).send('Route does not exit...')
}
module.exports=notfound;