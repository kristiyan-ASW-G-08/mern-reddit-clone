const express = require('express');
const { body } = require('express-validator/check');
const Community  = require('../models/community')
const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/user-get-posts/:userId',userController.getUserPosts);

module.exports = router;