const { Schema, model } = require('../../database');

const FeedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    lowercase: true
  }, 
  text: {
    type: String,
    required: true,
    minlength: 5,
    lowercase: true
  }
}, {
  timestamps: true
})

module.exports = model('Feedback', FeedbackSchema);