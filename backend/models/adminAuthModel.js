const mongoose = require('mongoose');
const {Schema} = mongoose;

const adminSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type:String,
    required: true,
    unique: true
  },
  phoneNumber:{
    type: Number,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  date:{
    type:Date,
    default: Date.now
  }
});

const Admin = mongoose.model('admin',adminSchema);
Admin.createIndexes();
module.exports = Admin;