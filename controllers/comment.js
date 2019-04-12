const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const Community = require('../models/community');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');
const errorsIsEmpty = require('../util/errorsIsEmpty')
exports.createComment = async (req, res, next) => {
  try {
    errorsIsEmpty(validationResult(req))
      const {postId} = req.params
     const {  content } = req.body;
    const user = await User.findById(req.userId);
    const post = await Post.findById(postId);;
    const community = await Community.findById(post.communityId)
    const banned = await community.authorized(req.userId)
    if(banned){
      res.status(403).json({msg:'You are not allowed to post or comment in this community!'})
    }
    else{
      const comment = new Comment({
        content,
        postId,
        postTitle:post.title,
        authorId: req.userId,
        author: user.username,
        communityId:post.communityId
      });
      await post.incrementComments()
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
      console.log('deleting comments')
      const { commentId } = req.params;
      const comment = await Comment.findById(commentId);;
      await comment.remove()
      const post = await Post.findById(comment.postId);;
      await post.decrementComments()
      res.status(200).json({ msg: 'deleted' });
    }catch(err){
      console.log(err)
    }
  }


  exports.editComment = async (req, res, next) => {
    try {
      errorsIsEmpty(validationResult(req))
        const {  content } = req.body;
      const { commentId } = req.params;
      const editComment = {
        content
      };
      await Comment.findOneAndUpdate({ _id: commentId }, editComment);
      const comment = await Comment.findById(commentId)
      res.status(201).json({ msg: 'updated',comment})
      
    } catch (err) {
      console.log(err)
      next(err)
      // errorFunc(err, next);
    }
  };
