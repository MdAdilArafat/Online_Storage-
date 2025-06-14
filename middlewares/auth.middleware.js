const userModel = require('../models/user.model')
const jwt  = require('jsonwebtoken')

module.exports.authUser = async (req,res,next)=>{
   
    const token  = req.cookies?.token || req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({message:"unauthorized1"})
    }

    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        
        const user = await userModel.findById(decoded._id)
        req.user = user
        return next()
    }catch(err){
        return res.status(401).json({message:"unauthorized2"})
    }
}  