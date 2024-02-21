const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const cartUserDetails = require('../models/cartModel');
const fetchuser = require('../middleware/fetchuser');


router.post('/addToCart',fetchuser,async (req,res)=>{
  const{productId, typeId, quantity} = req.body;
  const userId = req.user.id;
  const errors = validationResult(req);
  if(!errors.isEmpty() ){
      return res.status(400).json({errors: errors.array()});
  }
  try {
      const product = new cartUserDetails({
        productId,typeId,userId:req.user.id,quantity
      });
      const suchProductAlreadyExists = await cartUserDetails.find({productId,typeId,userId});
      if(suchProductAlreadyExists.length !== 0){
        return res.status(409).json({error: "Already in cart!"})
      }
      const savedInCart = await product.save();
      res.json({"success":"Product added to cart successfully!"})
  } catch (error) {
      console.error(error.message);
      res.json({error: "Internal server error"})
  }  
});

router.get('/fetchCartProducts',fetchuser,async (req,res)=>{
  const {id} = req.user;
  const userId = id;
  const errors = validationResult(req);
  if(!errors.isEmpty() ){
      return res.status(400).json({errors: errors.array()});
  }
  try {
      const fromCart = await cartUserDetails.find({userId});
      res.json(fromCart)
  } catch (error) {
      console.error(error.message);
      res.json({error: "Internal server error"})
  }  
});

router.put('/updateCartProducts',fetchuser,async (req,res)=>{
  const {quantity} = req.body;
  const cartId = req.header('cartId');
  const errors = validationResult(req);
  if(!errors.isEmpty() ){
      return res.status(400).json({errors: errors.array()});
  }
  try {
      if(!req.user.id){
        return res.status(401).json({"error": "Unauthorized access"});
      }

      const updatedQuantity = {}
      if(quantity){
        updatedQuantity.quantity = quantity;
      }
      let updatedResponse = await cartUserDetails.findByIdAndUpdate(cartId,{$set: updatedQuantity},{new:true});
      res.json({"success":"Updated cart successfully."})
  } catch (error) {
      console.error(error.message);
      res.json({error: "Internal server error"})
  }  
});

router.delete('/deleteFromCart',fetchuser,async (req,res)=>{
  const cartId = req.header('cartId');
  const errors = validationResult(req);
  if(!errors.isEmpty() ){
      return res.status(400).json({errors: errors.array()});
  }
  try {
      if(!req.user.id){
        return res.status(401).json({"error": "Unauthorized access"});
      }
      const fromCart = await cartUserDetails.findByIdAndDelete(cartId);
      res.json({"success":"Removed from cart successfully."})
  } catch (error) {
      console.error(error.message);
      res.json({error: "Internal server error"})
  }  
});
module.exports = router;

