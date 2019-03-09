const express = require('express');
const { body } = require('express-validator/check');
const User = require('../models/user');
const router = express.Router();

const authController = require('../controllers/auth');
router.post('/sign-up',[
  body('email', 'Please enter valid email!')
  .isEmail()
  .escape()
  .trim()
    .custom((email, { req }) => {
      return User.findOne({ email }).then(userDoc => {
        if (userDoc) {
          return Promise.reject(
            'Email is already associated with account, please use another one!'
          );
        }
      });
    }),
    body('username', 'Please enter valid username!')
  .isEmail()
  .escape()
  .trim()
    .custom((username, { req }) => {
      return User.findOne({ username }).then(userDoc => {
        if (userDoc) {
          return Promise.reject(
            'Username is taken!'
          );
        }
      });
    }),
    body('password', 'Please enter password that is  atleast 12 characters long ')
    .isLength({ min: 12 })
    .isAlphanumeric()
    .trim()
    .escape(),
  body('matchPassword')
    .trim()
    .isLength({ min: 12 })
    .isAlphanumeric()
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    })
], authController.signup);

router.post('/login', authController.login);

module.exports = router