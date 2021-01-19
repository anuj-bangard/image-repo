const express = require("express");
const router = express.Router();
const auth = require("../middlewares/upload.js");
const mongoose = require("mongoose");
const userModel = require("../models/user")


router.get("/",auth,async (req,res)=>{
    try {
        const user =await (await userModel.findById(req.id,'email date'));
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server Error"});
    }
})


module.exports=router