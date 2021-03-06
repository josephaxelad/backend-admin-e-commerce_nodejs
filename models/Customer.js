const mongoose = require('mongoose');
const user = require('../models/User');


const customerSchema = mongoose.Schema({
  user: { type: user.schema , required: true },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, required: true, default : false },
  isDisabled: { type: Boolean, required: true, default : false }
});


module.exports = mongoose.model('Customer', customerSchema);