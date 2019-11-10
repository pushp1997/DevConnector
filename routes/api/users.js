// Handles registering users, adding users
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if User exists
      let user = await User.findOne({ email }); // email: email not required since same name
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get User's Gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      // Creating the User using model
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt Password
      const salt = await bcrypt.genSalt(10); // More the rounds(10), more the security
      user.password = await bcrypt.hash(password, salt);

      // Saving the the user to the database
      await user.save();

      // Return jsonwebtoken (To get the user logged in as soon as he registers)

      res.send('User registered');
    } catch (ex) {
      console.log(ex.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
