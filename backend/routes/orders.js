const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const productMain = require('../models/productMain');
const productSub = require('../models/productSub');
const orderUserDetails = require('../models/orderModel');
const fetchadmin = require('../middleware/fetchadmin');
const fetchuser = require('../middleware/fetchuser');


router.post('/addToOrders',fetchuser,async (req,res)=>{
  const{typeId, productStatus, quantityOrdered, transactionUUID, urlForVerification} = req.body;
  const userId = req.user.id;
  const errors = validationResult(req);
  if(!errors.isEmpty() ){
      return res.status(400).json({errors: errors.array()});
  }
  try {
      const responseFromEsewa = await fetch(urlForVerification);
      const tempJson =await responseFromEsewa.json();
      if(tempJson['status']!=="COMPLETE")
        return res.status(401).json({"error":"Unauthorized access"});
      const suchOrderAlreadyExistsInOrder = await orderUserDetails.find({transactionUUID});
      if(suchOrderAlreadyExistsInOrder.length !== 0){
        return res.status(409).json({error: "Order placed already!"})
      }
      const product = new orderUserDetails({
        typeId,userId:req.user.id,productStatus,quantityOrdered,transactionUUID
      });
      const savedInCart = await product.save();
      res.json({"success":"Order placed successfully!"})
  } catch (error) {
      console.error(error.message);
      res.json({error: "Internal server error"})
  }  
});

router.get('/fetchUserOrders',fetchuser,async (req,res)=>{
  const {id} = req.user;
  const userId = id;
  const errors = validationResult(req);
  if(!errors.isEmpty() ){
      return res.status(400).json({errors: errors.array()});
  }
  try {
      const fromOrders = await orderUserDetails.find({userId});
      res.json(fromOrders)
  } catch (error) {
      console.error(error.message);
      res.json({error: "Internal server error"})
  }  
});

router.get('/fetchAllOrders',fetchadmin,async (req,res)=>{
  const {id} = req.admin;
  const productStatus = req.header('productStatus'); 
  const errors = validationResult(req);
  if(!errors.isEmpty() ){
      return res.status(400).json({errors: errors.array()});
  }
  try {
      const fromOrders = await orderUserDetails.find({productStatus});
      res.json(fromOrders)
  } catch (error) {
      console.error(error.message);
      res.json({error: "Internal server error"})
  }  
});

router.put('/markDelivered',fetchadmin,async (req,res)=>{
  const {id} = req.admin;
  const orderId = req.header('orderId');
  const errors = validationResult(req);
  if(!errors.isEmpty() ){
      return res.status(400).json({errors: errors.array()});
  }
  try {
    const updatedOrder = {
      productStatus: "delivered"
    }
      let updatedResponse = await orderUserDetails.findByIdAndUpdate(orderId,{$set: updatedOrder},{new:true});
      res.json({"success":"Product moved to delivered section successfully."})
  } catch (error) {
      console.error(error.message);
      res.json({error: "Internal server error"})
  }  
});



module.exports = router;