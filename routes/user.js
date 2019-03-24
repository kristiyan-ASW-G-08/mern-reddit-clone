const express = require('express');
const { body } = require('express-validator/check');
const Community  = require('../models/community')
const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/user-get-posts/:userId',userController.getUserPosts);
router.get('/user-get-comments/:userId',userController.getUserComments);
router.get('/user-get-saved/:userId',userController.getUserSavedPosts);
router.get('/user-get-upvoted/:userId',userController.getUserUpvotedPosts);
router.get('/user-get-downvoted/:userId',userController.getUserDownvotedPosts);
router.get('/user-get-communities/:userId',userController.getUserCommunities);
module.exports = router;