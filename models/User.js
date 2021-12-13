const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default : false },
  email: { type: String, required: true, unique : true, sparse:true },
  sex: { type : Number, required: false},
  creationDate : { type : Date, required : false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);