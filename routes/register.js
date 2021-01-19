const express = require("express")
const router = express.Router()
const userModel = require("../models/user")
const {body,validationResult} = require('express-validator');
const bcrypt = require("bcrypt");
const {Mongoose} = require("mongoose");
const jwt = require("jsonwebtoken");
const mykey = require("../config/config.json")

router.post("/register", [
    body('email').isEmail().withMessage("Enter valid Email"),
    body('password').isLength({min: 6}).withMessage("Enter password of atleast 6 characters")
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }else{
        const {email,password} = req.body;
        let user = userModel.findOne({email}, function (err, result){
            if(err){
                console.log(err);
                return res.status(400).json({msg:"error"});
            }
            else if(result){
                return res.status(401).json({msg:"Email already Registered"})
            }
        })
        
        user = new userModel({
            email,
            password
        })
        const salt = bcrypt.genSaltSync(10);
        bcrypt.hash(password, 10, function (err, hash) {
            user.password = hash
            user.save(function(err){
                if(!err){
                    console.log("User Added");
                    
                }else{
                    //console.log(err)
                    return res.status(400).json({msg:"error"});
                }
            })
            const token = jwt.sign({id:user.id},mykey.tokenKey,{expiresIn:360000});
            return res.json({"token":token});
        });
    }
})

module.exports = router