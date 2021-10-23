const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
  
  name : { type : String, required : true },
  link : { type : String, required : true },
  type : { type : String, required : true, default : 'product' },//product

});


module.exports = mongoose.model('Picture', pictureSchema);