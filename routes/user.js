const express = require('express');
const { body } = require('express-validator/check');
const Community = require('../models/community');
const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('/subscribe/:communityId', isAuth, userController.subscribe);
router.post(
  '/unsubscribe/:communityId',
  isAuth,
  userController.unsubscribe
);
router.get('/posts/:userId', userController.getUserPosts);
router.get('/comments/:userId', userController.getUserComments);
router.get('/saved:userId', userController.getUserSavedPosts);
router.get('/upvoted/:userId', userController.getUserUpvotedPosts);
router.get('/downvoted/:userId', userController.getUserDownvotedPosts);
router.get('/communities/:userId', userController.getUserCommunities);
module.exports = router;
