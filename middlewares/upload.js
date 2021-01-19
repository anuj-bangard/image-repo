const jwt = require("jsonwebtoken");
const mykey = require("../config/config.json")

function auth(req,res,next){
    /**get token */
    const token = req.header('x-auth-token');
    if(!token){
        res.status(401).json({msg:"No token found"})
    }
    try {
        const decodetoken = jwt.verify(token,mykey.tokenKey);
        req.id = decodetoken.id;
        next();
    } catch (error) {
        res.status(401).json({msg:"Invalid token"});
    }
}

module.exports = auth