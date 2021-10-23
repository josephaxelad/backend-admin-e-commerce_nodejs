const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = mongoose.Schema({
  name : { type : String, required : true},
  isParent : { type : Boolean, required : true, default : false},
  idParent : { type: String, required : false },
 
});

categorySchema.plugin(uniqueValidator);


module.exports = mongoose.model('Category', categorySchema);