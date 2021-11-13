const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const category = require('../models/Category');

const productSchema = mongoose.Schema({
  
  name : { type : String, required : true , unique : true, sparse:true },
  description : { type : String, required : true },
  stock : { type : Number, required : true, default : 1 },
  isHidden : { type : Boolean, required : true, default : false},
  isDeleted : { type : Boolean, required : true, default : false },
  isVisible : { type : Boolean, required : true, default : true },
  inStock : { type : Boolean, required : true, default : true },
  inTrend : { type : Boolean, required : true, default : false },
  inPromotion : { type : Boolean, required : false, default : 0 },
  promotionRate : { type : Number, required : false, default : 0 },
  promotionPrice : { type : Number, required : false, default : 0 },
  categoryId : { type: String, required : false },
  category : { type: category.schema, required : false },
  weight : { type : Number, required : true, default : 1 },
  picture : { type : String, required : false },
  imageUrl : { type : String, required : false },
  pictures : { type : [String], required : false },
  price : { type : Number, required : true },
  tags : { type : [String], required : false },
  createdBy : { type : String, required : true, default : "null"},
  creationDate : { type : Date, required : true}

});

productSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Product', productSchema);