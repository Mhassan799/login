const User = require('../model/usermodel')
const bcryot = require('bcrypt')
const jwt = require('../jwtmiddlewere/jwtmiddlewere')

exports.createUser = async(req,res)=>{

    try {
        const {name,email,pasword} = req.body
        const existing = await User.findOne({email})

        if(existing){

            return res.status(200).json({messege: "email already exist"})
        }
        else{
    // const hashPasword = await bcrypt.stringToHash(password,10)

            const user = new User({
                name,
                email,
                // password
            })
            await user.save()
            const token = jwt.sign(req.body)
            res.status(200).json(token)
        }
        
    } catch (error) {
        console.log(error)
        
    }
}

exports.login = async(req,res)=>{

    try {
        const{email,password} = req.body;
        const user = await User.findOne({email})

        if (!user) {
            return res.status(200).json({messege: "email does not exist"})
        }
        const isPaswd = bcrypt.varifyHash(password,user.password)
        if(!isPaswd){
            return res.status(400).json({message:"wrong Password"})
        }
        const token = jwt.sign(req.body)
        res.status(200).json({token})
    }
    catch(error)
    {
        return res.status(500).json({message:"internal server error",error:error.message})
    }
}
exports.getUsers = async(req,res)=>{
    const user = await User.find()
    return res.status(200).json(user)
}