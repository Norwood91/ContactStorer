const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();
const config = require('config')
const { body, validationResult } = require('express-validator');
const User = require('../models/User')

const registerInfoValidator =
  [
    body('name', 'Please enter your name').not().isEmpty(),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ]

//Registration Route
router.post('/', registerInfoValidator, async (req, res) => {
    const errors = validationResult(req);
    //If errors isn't empty (if there ARE errors)
    if (!errors.isEmpty()) {
      //errors.array gives an array with any errors in them
      return res.status(400).json({ errors: errors.array() });
   } 
  
    const { name, email, password } = req.body
  try {
      //Check to see if a user with the email already exists
      let user = await User.findOne({ email })
      //If a user with the same email DOES already exist
    if (user) {
        //return this message
        return res.status(400).json({msg: 'A user with this email already exists. Please register with a different email'})
      }
      //Else if no errors, then create an instance of a new user with the information entered
      user = new User({
        name,
        email,
        password
      })
      //Generate a salt 
    const salt = await bcrypt.genSalt(10)
    //Set the password for the user to be a hash instead of plain text
    user.password = await bcrypt.hash(password, salt)
    //save the new user
    await user.save()
    //The payload we are sending is just the user id
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      //End session in 36000 seconds (log user out)
      expiresIn: 36000
    }, (err, token) => {
        //if there's an error then throw the error
        if (err) throw err
        //else send the token in json
        res.json({token})
    })

    } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
    }
    
  }
);


module.exports = router;
