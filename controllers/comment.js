const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');

exports.createComment = async (req, res, next) => {
  try {
      const {postId} = req.params
     const {  content } = req.body;
    console.log(content,postId)
    const user = await User.findById(req.userId);
    console.log(postId)
    const post = await Post.findById(postId);;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array()
      throw error;
    } else {
      const comment = new Comment({
        content,
        postId,
        postTitle:post.title,
        authorId: req.userId,
        author: user.username,
        communityId:post.community
      });
      await comment.save();
      res.status(201).json({comment});
    }
  } catch (err) {
    console.log(err);
    next(err)
    // errorFunc(err, next);
  }
};
 
exports.getComments = async (req,res,next) => {
    try{
      const {postId} = req.params;
      const {page} = req.query
      const currentPage = page || 1
      const commentsPerPage = 7
      const comments = await Comment.find({postId}).countDocuments().find().skip((currentPage -1) * commentsPerPage).limit(commentsPerPage)
      res.status(200).json({comments}); 
    }
    catch(err){
      console.log(err)
    }
  }
  


  exports.deleteComment = async(req,res,next) => {
    try{
      const { commentId } = req.params;
      console.log(commentId)
      await Comment.findByIdAndDelete(commentId);
      res.status(200).json({ msg: 'Comment Deleted' });
    }catch(err){
      console.log(err)
    }
  }


  exports.editComment = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array()
        throw error;
      } else {
        const {  content } = req.body;
      const { commentId } = req.params;
      const editComment = {
        content
      };
      await Comment.findOneAndUpdate({ _id: commentId }, editComment);
      const comment = await Comment.findById(commentId)
      res.status(201).json({ msg: 'updated',comment})
      }
    } catch (err) {
      console.log(err)
      next(err)
      // errorFunc(err, next);
    }
  };
// exports.getPost = async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const post = await Post.findById(postId);
//     mongoose.Types.ObjectId;
//     res.status(200).json({ post });
//   } catch (err) {
//     console.log(err);
//     // errorFunc(err, next);
//   }
// };
