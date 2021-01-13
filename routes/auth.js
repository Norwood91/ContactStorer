const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');
const User = require('../models/User')

const loginInfoMiddleware =[
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
]

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

//Log In Route
router.post('/', loginInfoMiddleware, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({msg: "Username or password is incorrect. Please try again"})
    }
    //Check to see if the password entered, matches the users password that's stored in the db. Will return true or false
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({msg: "Username or password is incorrect. Please try again"})
    }
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err
        res.json({token})
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

module.exports = router;
