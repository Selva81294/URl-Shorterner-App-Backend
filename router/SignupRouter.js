import express from "express"
import bcrypt from "bcrypt"
import {generateAuthToken, User} from "../models/userModel.js"


const signupRouter = express.Router();

signupRouter.post ("/", async (req,res)=>{
    try {
        let user = await User.findOne({email: req.body.email});
        if(user) return res.status(409).json({message: "Email already exits"});
    
        //generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        //new user updation
        user = await new User({
               name : req.body.name,
               email : req.body.email,
               password : hashedPassword 
            }).save();  

        //token using
        const token =  generateAuthToken(user._id)

        res.status(201).json({message: "Successfully signed up", token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }

})

//get all users
signupRouter.get("/users", async (req,res)=>{
    try {
        const user = await User.find()
        if(!user) return res.status(400).json({message:"Could not fetch your data"}) 
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Internal Server Error"})
    }
})


export default signupRouter;
