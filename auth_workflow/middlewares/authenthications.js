const jwt=require('jsonwebtoken');
const User=require('../models/auth')
const authenthication=async (req,res,next)=>{

    const authhead=req.headers.authorization;
    if(!authhead || !authhead.startsWith('Bearer ')){
        return res.status(400).json('Access token missing. Please login again.')
    }
    try {
        const token= authhead.split(' ')[1];
        const user=await jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET);
        req.user={username:user.username,Token:'access Token'}
        return next()
    } catch (accessTokenError) {
            const refreshhead=req.headers['refresh-token'];
            if(!refreshhead || !refreshhead.startsWith('Bearer ')){
                return res.status(400).json(' expired. Please login again.')
            }
        try {
            const reToken= refreshhead.split(' ')[1];
            const reuser=await jwt.verify(reToken,process.env.JWT_REFRESH_TOKEN_SECRET);
            const find=await User.findOne({_id:reuser.userId});
            if (!find) {
                return res.status(403).json('User not found. Please login again.');
            }
            const newaccesstoken=await find.createaccesstoken();
            res.setHeader('Authorization', `Bearer ${newaccesstoken}`);
            const user=await jwt.verify(newaccesstoken,process.env.JWT_ACCESS_TOKEN_SECRET);
            req.user={username:user.username,Token:'refresh created access Token'}

            return next()
        } catch (error) {
            return res.status(403).json('Invalid refresh token. Please login again...!!');
        }

    }
    
}
module.exports=authenthication;