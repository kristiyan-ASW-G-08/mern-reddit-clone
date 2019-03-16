const Post = require('../models/post');
const User = require('../models/user');
const { validationResult } = require('express-validator/check');
// const errorFunc = require('../util/errorFunc');

exports.createPost = async (req, res, next) => {
  try {
    const { title, content,communityId, } = req.body;
    const user = await User.findById(req.userId)
    const errors = validationResult(req);
    console.log(user)
    if (!errors.isEmpty()) {
      const errorMsg = errors.array()[0].msg;
      res.json({ error: errorMsg });
    } else {
      const post = new Post({
        title,
        content,
        community:communityId,
        authorId: req.userId,
        author:user.username,
      });
      await post.save();
      res.status(200).json({ msg: 'Post succesfully added', postId: post._id });
    }
  } catch (err) {
        console.log(err)
    // errorFunc(err, next);
  }
};
// exports.deletePost = async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     await Post.findByIdAndDelete({ _id: postId });
//     res.status(200).json({ msg: 'postDeleted' });
//   } catch (err) {
//         console.log(err)
//     // errorFunc(err, next);
//   }
// };
// exports.editPost = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const errorMsg = errors.array()[0].msg;
//       res.json({ error: errorMsg });
//     } else {
//       const { title, postContent } = req.body;
//       const { postId } = req.params;
//       const post = {
//         title,
//         postContent
//       };
//       await Post.findOneAndUpdate({ _id: postId }, post);
//       res.status(200).json({ msg: 'updated' });
//     }
//   } catch (err) {
//     errorFunc(err, next);
//   }
// };


