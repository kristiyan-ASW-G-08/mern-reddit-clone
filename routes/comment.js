
const express = require('express');
const { body } = require('express-validator/check');
const Comment  = require('../models/comment')
const commentController = require('../controllers/comment');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
router.post(
  '/create-comment/:postId',
  [
     body('content', 'Content should be atleast 1 character long')
    .isLength({ min: 1 })
    .isString()
    .trim()
  ],
  isAuth,
  commentController.createComment
);
router.get('/comments/:postId',commentController.getComments)



module.exports = router;


