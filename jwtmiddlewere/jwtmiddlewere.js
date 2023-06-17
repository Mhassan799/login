const jwt = require('jsonwebtoken')
const secretKey = "hassan"

const jwtConfig= {
    sign(payload){
        const token = jwt.sign(payload,secretKey)
        return token
    },

    verifyToken(req,res,next){
        const token = req.header.authorization?.split(' ')[1];

        if(!token){
           return  res.status(401).json({messege: "no token provided"})
        }
        else{

            try {
                const decoded = jwt.verify(token,secretKey);
                console.log(decoded)
                req.userId = decoded.userId
                next()
                
            } catch (error) {
                return res.status(401).json({messege: "invalid token"})
            }
        }
    }
}


module.exports=jwtConfig