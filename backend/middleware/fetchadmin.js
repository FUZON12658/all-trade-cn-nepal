require("dotenv").config();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_ADMIN;

const fetchadmin = (req, res, next)=>{
    //get the user from the jwt token and add id to req onject
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token,JWT_SECRET );
        req.admin = data.admin;
        next() 
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
}

module.exports = fetchadmin;