const mongoose = require('mongoose')
const {Schema} = mongoose;

const orderSchema = new Schema({
  typeId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  productStatus:{
    type: String,
    enum: ['pending', 'delivered'],
    required:true
  }, 
  quantityOrdered:{
    type: String,
    requried: true
  },
  transactionUUID:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  }
});
const userOrderDetails = mongoose.model('userOrderDetails', orderSchema);
userOrderDetails.createIndexes();
module.exports = userOrderDetails; 