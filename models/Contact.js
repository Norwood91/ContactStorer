const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
