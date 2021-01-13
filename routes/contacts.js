const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const Contact = require('../models/Contact')
//Contacts are going to be associated to a specific user, so you can only get your own contacts

const contactInfoValidator = [
  body('name', 'Name is required').not().isEmpty(),
  body('phone', 'Phone number is required').not().isEmpty()
]




router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({
      user: req.user.id
    }).sort({ date: -1 })
    res.json(contacts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

router.post('/', auth, contactInfoValidator, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  const { name, email, phone, type } = req.body
  try {
    //Instantiate a new instant of a contact
    const newContact = new Contact({
      name, 
      email,
      phone,
      type,
      user: req.user.id
    })
    //save contact to database
    const contact = await newContact.save()
    //return the contact to the client
    res.json(contact)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body
  //Build Contact Object
  const contactFields = {}
  if (name) contactFields.name = name
  if (email) contactFields.email = email
  if (phone) contactFields.phone = phone
  if (type) contactFields.type = type

  try {
    let contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ msg: 'Contact not found' })
    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'You are not authorized to do that'})
    }
    contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true })
    res.json(contact)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ msg: 'Contact not found' })
    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'You are not authorized to do that'})
    }
    await Contact.findByIdAndRemove(req.params.id)
    res.json({msg: 'Contact successfully removed'})
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

module.exports = router;
