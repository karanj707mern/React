const userModel = require("../Model/userModel")
require("dotenv").config();
const bcrypt = require("bcrypt")

export const Register = async(req,res) =>{
    const {username,email,password}= req.body;
    try {
        const ExistingUser = await userModel.findOne({email:email})
    if(ExistingUser){
        return res.status(400).json({message:"User already exists"})
    }
    }
    catch(err) {
        res.status(500).json({message:"Something went wrong"})
    }
    finally{
        const hashedpassword = await bcrypt.hash(password,10);
        const newUser = new userModel({username,email,password:hashedpassword});
        console.log("hash:", hashedpassword)
        await newUser.save();
        res.status(201).json({message:"User registered successfully"})
    }
}

export const login = async(req,res) => {
    const {email,password} = req.body;
    try {
        const ExistingUser = await userModel.find({email:req.body.email});
        if(!ExistingUser){
            return res.status(404).json({message:"User not found"})
        }
        if(ExistingUser){
            data = ExistingUser[0];
           const truepassword = await bcrypt.compare(password,data.password);
           if(!truepassword){
            return res.status(400).json({message:"Pas"})
           }
    }
}