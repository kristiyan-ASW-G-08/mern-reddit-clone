const express = require('express');
const { body } = require('express-validator/check');
const User  = require('../models/user')
const saveConrtroller = require('../controllers/save');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
router.post(
  '/save/:postId',
  isAuth,
  saveConrtroller.save
);


module.exports = router;