const { Schema, model }  = require('../../database');

const preRegisterSchema = new Schema({
  name:{
    type: String,
    minlength: 3,
    maxlength: 40,
    required: true,
    lowercase: true
  },
  email: {
    type: String,   
    minlength: 5,
    maxlength: 40,
    lowercase: true
  },
  phone: {
    type: String,   
    minlength: 11,
    maxlength: 15,   
    lowercase: true 
  }
}, {
  timestamps: true
})

module.exports = model('PreRegister', preRegisterSchema);