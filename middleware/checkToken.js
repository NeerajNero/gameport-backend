const jwt = require('jsonwebtoken')
const checkToken = async(req,res,next) => {
    try{
        const token = req.cookies.access_token;
    if(!token){
        return res.status(404).json({message: "token not found"})
    }
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
    req.user = verifyToken
    next()
    }catch(error){
        return res.status(401).json({ message: "Invalid token" });
    }
}
module.exports = checkToken