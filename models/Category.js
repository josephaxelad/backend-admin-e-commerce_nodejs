const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = mongoose.Schema({
  name : { type : String, required : true},
  isParent : { type : Boolean, required : true, default : false},
  idParent : { type: String, required : false },
  createdBy : { type : String, required : true, default : "null"},
  creationDate : { type : Date, required : true}
 
});

categorySchema.plugin(uniqueValidator);


module.exports = mongoose.model('Category', categorySchema);