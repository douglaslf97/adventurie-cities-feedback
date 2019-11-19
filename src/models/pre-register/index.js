const { Schema, model }  = require('../../database');
const { validatePhone, validateEmail } = require('../../utils/validators');
const preRegisterSchema = new Schema({
  name:{
    type: String,
    minlength: 3,
    maxlength: 40,
    required: true
  },
  email: {
    type: String,
    validate: {
      validator: validateEmail(v),
      message: props => `${props.value} is not a valid email!`
    },    
    minlength: 5,
    maxlength: 40
  },
  phone: {
    minlength: 11,
    maxlength: 15,
    type: String,
    validate: {
      validator: validatePhone(v),
      message: props => `${props.value} is not a valid phone number!`
    },    
  }
}, {
  timestamps: true
})

module.exports = model('PreRegister', preRegisterSchema);