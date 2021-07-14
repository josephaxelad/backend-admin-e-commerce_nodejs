const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const user = require('../models/User');

const adminSchema = mongoose.Schema({
  user: { type: user.schema },
  login: { type: String, required: true, unique : true, sparse:true },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, required: true, default : false },
  role: { type: String, required: true, default : 'admin'},//superadmin,admin
});

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin', adminSchema);