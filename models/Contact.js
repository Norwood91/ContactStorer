
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'personal'
  },
  email: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
