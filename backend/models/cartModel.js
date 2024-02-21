const mongoose = require('mongoose')
const {Schema} = mongoose;

const cartSchema = new Schema({
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    required :true
  },
  typeId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  quantity:{
    type: Number,
    required:true
  }
});
const cartUserDetails = mongoose.model('cartUserDetails', cartSchema);
cartUserDetails.createIndexes();
module.exports = cartUserDetails;