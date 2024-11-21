const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

const register = async(req,res) => {
    try{
        const {userName,password, email, isAdmin} = req.body
        const existingUser = await User.findOne({userName})
        if(existingUser){
            return res.status(409).json({message: "User Name unavailable or already in Use"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            userName,
            email,
            password: hashedPassword,
            isAdmin
        })
        await user.save();
        res.status(201).json({message: "user created"})
    }catch(error){
        console.error("Registration error:", error);
        res.status(500).json({message: "unable to register"})
    }
}

const login = async(req,res) => {
    try{
        const {userName, password} = req.body
        if(!userName || !password){
            return res.status(400).json({message: "please fill in all fields"})
        }
        const existingUser = await User.findOne({userName})
        if(!existingUser){
            return res.status(404).json({message: "user not found"})
        }
        const comparePassword = await bcrypt.compare(password, existingUser.password)
        if(!comparePassword){
            return res.status(401).json({message: "Invalid Credentials"})
        }
        const user = {
            userId: existingUser._id,
            userName
        }
        const token = jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: "1d"});
        res.cookie("access_token", token, {httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000})
        res.status(200).json({message: "login successfull", user})
    }catch(error){
        res.status(500).json({message: "login failed"})
    }
}
const getUser = async(req,res) => {
    try{
            if(!req.user){
                return res.status(404).json({message: "no user found"})
            }
            res.status(200).json({message: "user data fetched successfully", user: req.user})
    }catch(error){
        res.status(500).json({message: "error occured while fetching user"})
    }
}
module.exports = {register, login, getUser}