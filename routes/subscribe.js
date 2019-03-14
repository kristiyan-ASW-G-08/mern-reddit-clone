const express = require('express');
const { body } = require('express-validator/check');
const User  = require('../models/user')
const subscribeController = require('../controllers/subscribe');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
router.post(
  '/subscribe/:communityId',
  isAuth,
  subscribeController.subscribe
);

router.get('/unsubscribe/:communityId',subscribeController.unsubscribe);

module.exports = router;