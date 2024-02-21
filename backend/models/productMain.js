const mongoose = require('mongoose');
const {Schema} = mongoose;

const productMainSchema = new Schema({
  admin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin'
  },
  productName:{
    type: String,
    required: true
  },
  category:{
    type: String,
    requried: true
  },
  types:{
    type: Number,
    required: true
  },
  addedOn:{
    type: Date,
    default: Date.now
  }
});
const productMain = mongoose.model('productMain',productMainSchema);
productMain.createIndexes();
module.exports = productMain;