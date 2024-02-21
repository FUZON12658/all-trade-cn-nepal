const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const productMain = require('../models/productMain');
const productSub = require('../models/productSub');
const fetchadmin = require('../middleware/fetchadmin');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/productImages'); // Set the destination folder for your uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/productMain',fetchadmin,[body('productName','Enter valid product name').isLength({min:3}),
body("category","Enter valid category").isLength({min:2}),
body('types','Not a nubmer').isNumeric()],async (req,res)=>{
  const{productName, category, types} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty() ){
      return res.status(400).json({errors: errors.array()});
  }
  try {
      const product = new productMain({
        admin:req.admin.id,productName,category,types
      });
      const suchProductAlreadyExists = await productMain.find({productName,category});
      if(suchProductAlreadyExists.length !== 0){
        return res.status(409).json({error: "Such product already exsits"})
      }
      const savedProductMain = await product.save();
      res.json(savedProductMain)
  } catch (error) {
      console.error(error.message);
      res.json({error: "Internal server error"})
  }  
});

router.post('/productSub',upload.array('productImage',10),fetchadmin,[
  body('productName', 'Enter valid product name').isLength({ min: 1 }),
  body('typeIndicator', 'Enter valid product type').isLength({ min: 1 }),
  body('price', 'Enter a valid product price').isLength({ min: 1 }),
  body('remainingStock', 'Enter a number').isNumeric(),
  body('description', 'Enter a valid description').isLength({ min: 1 }),
  // New validation rule to check if at least one image is uploaded
  (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Please upload at least one photo.' });
    }
    next();
  }
],async (req,res)=>{
  const{productName, typeIndicator,category, price, remainingStock, description} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty() ){
      return res.status(400).json({errors: errors.array()});
  }
  try {
    let productSubChild = new productSub({
      admin:req.admin.id,typeIndicator,productName,category, price, remainingStock, description,images: req.files.map(file => file.path)
    });
    const suchProductAlreadyExists = await productSub.find({typeIndicator,productName,category});
      if(suchProductAlreadyExists.length !== 0){
        return res.status(409).json({error: "Such product type already exsits"})
      }
    const savedProductSub = await productSubChild.save();
    res.send(savedProductSub);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({error: "Internal server error"})
  }
});


router.get('/fetchAllProductMains',fetchadmin,async (req,res)=>{
  const productMains = await productMain.find({admin: req.admin.id});
  res.json(productMains);
});

router.get('/fetchAllProductMainsDirectly',async (req,res)=>{
  const productMains = await productMain.find();
  res.json(productMains);
});

router.get('/fetchAllProductSubs',fetchadmin,async (req,res)=>{
  const productSubs = await productSub.find({admin: req.admin.id});
  res.json(productSubs);
});

router.get('/fetchAllProductSubsDirectly',async (req,res)=>{
  const productMains = await productSub.find();
  res.json(productMains);
});

router.get('/fetchProductMainsByCategory',async (req,res)=>{
  const category = req.header('category');
  try {
    const productMainsByCategory = await productMain.find({category});
    res.json(productMainsByCategory);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({error: "Internal server error"})
  }
});

router.get('/fetchProductSubsByName',async (req,res)=>{
  const productName = req.header('productName');
  const category = req.header('category');
  try {
    const productSubsByName = await productSub.find({productName,category});
    res.json(productSubsByName);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({error: "Internal server error"})
  }
});

router.get('/fetchProductMainsById',async (req,res)=>{
  const _id = req.header('productMainId');
  try {
    const productMainsById = await productMain.find({_id});
    res.json(productMainsById);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({error: "Internal server error"})
  }
});

router.get('/fetchProductSubsById',async (req,res)=>{
  const _id = req.header('productSubId');
  try {
    const productSubsById = await productSub.find({_id});
    res.json(productSubsById);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({error: "Internal server error"})
  }
});

router.put('/updateProductMains/:id',fetchadmin,async (req,res)=>{
  const {productName, category, types} = req.body;
  try {
    const newProduct = {};
    if(productName){newProduct.productName = productName};
    if(category){newProduct.category = category};
    if(types){newProduct.types = types};

    let productMainChild = await productMain.findById(req.params.id);
    if(!productMainChild){return res.status(404).send("Not such product found")};
    if(productMainChild.admin.toString() !== req.admin.id){
      return res.status(401).send("not allowed!");
    }
    productMainChild = await productMain.findByIdAndUpdate(req.params.id,{$set: newProduct},{new:true});
    res.json(productMainChild);
  } catch (error) {
    console.error(error.message);
    res.json({error: "Internal server error"})
  }
});


router.delete('/deleteProductMains/:id',fetchadmin,async (req,res)=>{
  try {
    let productMainChild = await productMain.findById(req.params.id);
    if(!productMainChild){return res.status(404).send("Not such product found")};
    if(productMainChild.admin.toString() !== req.admin.id){
      return res.status(401).send("not allowed!");
    }
    let productName = productMainChild.productName;
    let category = productMainChild.category;
    let productSubChildren = await productSub.find({productName, category});
    productSubChildren.forEach(async (child) => {
      let id = child._id;
      for (const imagePath of child.images) {
        await fs.unlink(imagePath);
      }
      child = await productSub.findByIdAndDelete(id);
    });
    productMainChild = await productMain.findByIdAndDelete(req.params.id);
    res.json({"success":"Product Type Deleted"});
  } catch (error) {
    console.error(error.message);
    res.json({error: "Internal server error"})
  }
});

router.delete('/deleteProductSubs/:id', fetchadmin, async (req, res) => {
  try {
    let productSubChild = await productSub.findById(req.params.id);

    if (!productSubChild) {
      return res.status(404).send("Not such product found");
    }

    if (productSubChild.admin.toString() !== req.admin.id) {
      return res.status(401).send("Not allowed!");
    }

    // Delete associated images from the server
    for (const imagePath of productSubChild.images) {
      await fs.unlink(imagePath);
    }

    // Delete the productSub document
    productSubChild = await productSub.findByIdAndDelete(req.params.id);

    res.json({ success: "Product Type Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete single image
router.delete('/deleteProductSubImage/:id/:imageName', fetchadmin, async (req, res) => {
  const productId = req.params.id;
  const imageName = req.params.imageName;

  try {
    const product = await productSub.findOne({ _id: productId, admin: req.admin.id });
    if (!product) {
      return res.status(404).json({ error: "Product not found or unauthorized access" });
    }

    const imagePath = `backend\\productImages\\productImage-${imageName}`;
    const imageIndex = product.images.findIndex((img) => img === imagePath);

    if (imageIndex === -1) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Remove the image path from the array
    product.images.splice(imageIndex, 1);

    // Update the productSub document with the new images array
    await product.save();

    // Delete the image file from the server
    await fs.unlink(imagePath);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// router.get('/updateProductMains',fetchadmin,async (req,res)=>{
//   const productMains = await productMain.find({admin: req.admin.id});
//   res.json(productMains);
// });


router.put('/updateProductSub/:id', upload.array('productImage', 5), fetchadmin, async (req, res) => {
  const productId = req.params.id;
  const { typeIndicator, price, remainingStock, description } = req.body;

  try {
    const updatedProductData = {};
    let productSubChild = await productSub.findById(productId);

    if (!productSubChild) {
      return res.status(404).send("No such product found");
    }

    if (productSubChild.admin.toString() !== req.admin.id) {
      return res.status(401).send("Not allowed!");
    }

    // Update the productSub document with the new information
    if (typeIndicator) {
      updatedProductData.typeIndicator = typeIndicator;
    }

    if (price) {
      updatedProductData.price = price;
    }

    if (remainingStock) {
      updatedProductData.remainingStock = remainingStock;
    }

    if (description) {
      updatedProductData.description = description;
    }

    // If new images are provided, add them to the existing images array
    if (req.files && req.files.length > 0) {
      const newImagesPaths = req.files.map(file => file.path);
      updatedProductData.images = [...productSubChild.images, ...newImagesPaths];
    }

    // Save the updated productSub
    let updatedProductSubChild = await productSub.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    res.json(updatedProductSubChild);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;