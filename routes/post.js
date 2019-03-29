
const express = require('express');
const { body } = require('express-validator/check');
const Post  = require('../models/post')
const postController = require('../controllers/post');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
router.post(
  '/post/:communityId',
  [
      body('title', 'Title should be atleast 1 character long')
    .isLength({ min: 1 })
    .isString()
    .trim(),
     body('content', 'Content should be atleast 1 character long')
    .isLength({ min: 1 })
    .isString()
    .trim()
  ],
  isAuth,
  postController.createPost
);

router.post(
    '/edit/:postId',
     [
      body('title', 'Title should be atleast 1 character long')
    .isLength({ min: 4 })
    .isString()
    .trim(),
     body('content', 'Content should be atleast 1 character long')
    .isLength({ min: 10 })
    .isString()
    .trim()
  ],
    isAuth,
    postController.editPost
  );

router.delete(
    '/delete/:postId',
    isAuth,
    postController.deletePost
  );


router.get(
    '/get/:postId',
    postController.getPost
)
router.post(
  '/upvote/:postId',
  isAuth,
  postController.upvote
)
router.post(
  '/downvote/:postId',
  isAuth,
  postController.downvote
)

router.get(
  '/posts',
  postController.getPosts
)
module.exports = router;


