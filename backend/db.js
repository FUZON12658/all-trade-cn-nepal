const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/all-trade-cn?directConnection=true";
// const mongoURI = "mongodb+srv://antc12658:antc2080antc12658@allnepaltradecenterinst.jnocfee.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = () =>{
  mongoose.connect(mongoURI). then(()=>{
    console.log("connected to mongo successfully");
  }).catch((e)=>console.log(e.message));
};

module.exports = connectToMongo;