const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{
    console.log("Inside Register Function !!!");
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{
        const existingUser = await users.findOne({email})
        if (existingUser){
            res.status(406).json("User Already Exists")
        }else{
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
         }
    }catch(err){
        res.status(401).json("err")

    }


}

exports.login = async (req,res)=>{
    console.log("inside login function");
    const {email,password}=req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email,password})
        if (existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
            res.status(200).json({
                existingUser,
                token
            }) 
        }else{
            res.status(404).json("Incorrect Password/Email")
        }
    }
    catch(err){
        res.status(401).json(err)
     }

}

exports.editUser=async (req,res)=>{
    const {userId}=req.body
}