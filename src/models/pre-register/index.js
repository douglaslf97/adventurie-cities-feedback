const { Schema, model }  = require('../../database');

const preRegisterSchema = new Schema({
  name:{
    type: String,
    minlength: 3,
    maxlength: 40,
    required: true
  },
  email: {
    type: String,   
    minlength: 5,
    maxlength: 40
  },
  phone: {
    type: String,   
    minlength: 11,
    maxlength: 15,    
  }
}, {
  timestamps: true
})

module.exports = model('PreRegister', preRegisterSchema);