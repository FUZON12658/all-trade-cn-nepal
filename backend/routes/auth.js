const express = require('express');
const router = express.Router();
const User = require('../models/userAuthModel');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const fetchadmin = require('../middleware/fetchadmin');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET_USER;

router.post('/',[body('email','Enter a valid mail').isEmail(),
body('password','Password cannot be blank').exists()], async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {email, password} = req.body;
  try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: "Please try to login with different credentials!"});
      }

      const pwdCompare = await bcrypt.compare(password, user.password);
      if(!pwdCompare){
        return res.status(400).json({error: "Please try to login with different credentials!"});
      }

      const data={
        user:
       {
         id: user.id
       }
     }
     const authtoken = jwt.sign(data, JWT_SECRET);
     res.json({authtoken,success:true});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({error: "Internal server error"});
  }
});

router.post('/signup',[body('email','Enter a valid mail').isEmail(),
body('phoneNumber','Enter a valid phone number').isLength({min:10}),
body('address',"Enter a valid address").isLength({min:6}),
body('name',"Name must be at least 3 characters").isLength({min:3}),
body('password','Password must be at least 8 characters').isLength({min:8})], async (req,res)=>{
  
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  try {
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error: "Email already exists!"})
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword =  await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      password: securePassword
    });

    const data = {
      user:{
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken,success:true});

  } catch (error) {
    console.error(error.message);
    res.json({error:"Internal server error during admin login"})
  }
});

router.get('/getuser' ,fetchuser, async (req,res)=>{
  try{
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    if(user){
      res.send(user);
    }
    else{
      res.send({"error":"no such user exists"});
    }
      
  }
  catch (error) {
    console.error(error.message);
    res.status(500).json({error: "Internal server error"});
  }
});

router.get('/getuseradmin' ,fetchadmin, async (req,res)=>{
  try{
    let userId = req.header('uId');
    const user = await User.findById(userId).select("-password")
    if(user){
      res.send(user);
    }
    else{
      res.send({"error":"no such user exists"});
    }
      
  }
  catch (error) {
    console.error(error.message);
    res.status(500).json({error: "Internal server error"});
  }
});

router.post('/updateUser',fetchuser, async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const {email, name, phoneNumber, address} = req.body;
  try {
    const updatedUser ={};
    if(name){updatedUser.name = name};
    if(phoneNumber){updatedUser.phoneNumber= phoneNumber};
    if(address){updatedUser.address= address};
    
    let updatedResponse = await User.findByIdAndUpdate(req.user.id,{$set: updatedUser},{new:true}).select("-password");
    res.send(updatedResponse);

  } catch (error) {
    console.error(error.message);
    res.json({error:"Internal server error during admin login"})
  }
});




module.exports = router;