const express = require("express")
const router = express.Router()
const userModel = require("../models/user")
const {body,validationResult} = require('express-validator');
const bcrypt = require("bcrypt");
const {Mongoose} = require("mongoose");
const jwt = require("jsonwebtoken")
const mykey = require("../config/config.json")

router.post("/login", [
    body('email').isEmail().withMessage("Enter valid Email"),
    body('password').isLength({
        min: 6
    }).withMessage("Enter password of atleast 6 characters")
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        email,
        password
    } = req.body;

    const user = userModel.findOne({email}, function (err, result) {
        if (result) {
            bcrypt.compare(password, result.password, function (err, match) {
                if (!err) {
                    if (match) {
                        console.log("Logged in");
                        const token = jwt.sign({id:result.id},mykey.tokenKey,{expiresIn:360000});
                        return res.json({token});
                    } else {
                        console.log("incorrect password");
                        return res.status(401).json({
                            msg: "incorrect password"
                        });
                    }
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
            return res.status(404).json({
                msg: "email does not exist"
            })
        }
    })
})

module.exports = router