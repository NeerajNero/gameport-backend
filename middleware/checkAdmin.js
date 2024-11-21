const mongoose = require('mongoose')
const User = require('../models/user.model')
const checkAdmin = async(req,res,next) => {
    try{
        const {userId} = req.user.user
        const findUser = await User.findById(userId)
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
          }

        if(!findUser){
           return res.status(403).json({message: "access denied only Admin has access"})
        }
        next()
    }catch(error){
        console.error("Error in checkAdmin middleware:", error);
        res.status(500).json({message: "an error occurred"})
    }
}
module.exports = checkAdmin