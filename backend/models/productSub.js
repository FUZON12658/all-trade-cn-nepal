const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSubSchema = new Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin'
  },
  typeIndicator: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },  
  category: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  remainingStock: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{ type: String }] // Assuming each image is stored as a string path
});

const productSub = mongoose.model('productSub', productSubSchema);
productSub.createIndexes();
module.exports = productSub;