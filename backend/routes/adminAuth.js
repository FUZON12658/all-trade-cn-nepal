const express = require('express');
const router = express.Router();
const Admin = require('../models/adminAuthModel');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchadmin = require('../middleware/fetchadmin');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET_ADMIN;



router.post('/',[body('email','Enter a valid mail').isEmail(),
body('password','Password cannot be blank').exists()], async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {email, password} = req.body;
  try {
      let admin = await Admin.findOne({ email: { $regex: new RegExp('^' + email, 'i') } });
      if(!admin){
        return res.status(400).json({error: "Please try to login with different credentials!"});
      }

      const pwdCompare = await bcrypt.compare(password, admin.password);
      if(!pwdCompare){
        return res.status(400).json({error: "Please try to login with different credentials! pass wrong"});
      }

      const data={
        admin:
       {
         id: admin.id
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
body('name',"Name must be at least 3 characters").isLength({min:3}),
body('password','Password must be at least 8 characters').isLength({min:8})], async (req,res)=>{
  
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  try {
    let admin = await Admin.findOne({email: req.body.email});
    if(admin){
      return res.status(400).json({error: "Email already exists!"})
    }
    admin = await Admin.findOne({phoneNumber: req.body.phoneNumber});
    if(admin){
      return res.status(400).json({error:"Phone number already exists!"})
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword =  await bcrypt.hash(req.body.password, salt);
    admin = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: securePassword
    });

    const data = {
      admin:{
        id: admin.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken,success:true});

  } catch (error) {
    console.error(error.message);
    res.json({error:"Internal server error during admin login"})
  }
});

router.post('/getadmin' ,fetchadmin, async (req,res)=>{
  try{
    let adminId = req.admin.id;
    const admin = await Admin.findById(adminId).select("-password")
    if(admin){
      res.send(admin);
    }
    else{
      res.json({error:"Unauthorized access"});
    }
    
  }
  catch (error) {
    console.error(error.message);
    res.status(500).json({error: "Internal server error"});
  }
});

module.exports = router;