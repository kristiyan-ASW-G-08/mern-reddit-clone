
const express = require('express');
const { body } = require('express-validator/check');
const Post  = require('../models/post')
const postController = require('../controllers/post');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
router.post(
  '/create-post',
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

// router.post(
//     '/edit-post/:postId',
//      [
//       body('title', 'Title should be atleast 1 character long')
//     .isLength({ min: 1 })
//     .isString()
//     .trim(),
//      body('content', 'Content should be atleast 1 character long')
//     .isLength({ min: 1 })
//     .isString()
//     .trim()
//   ],
//     isAuth,
//     postController.editPost
//   );

// router.delete(
//     '/delete-post/:postId',
//     isAuth,
//     postController.deletePost
//   );


// router.get(
//     '/get-post/:postId',
//     isAuth,
//     postController.getPost
// )
module.exports = router;