const Post = require('../models/post');
const User = require('../models/user');
const mongoose = require('mongoose');
const Community = require('../models/community');
const { validationResult } = require('express-validator/check');

exports.createPost = async (req, res, next) => {
  try {
    const {communityId} = req.params
    const { title, content,} = req.body;
    const user = await User.findById(req.userId);
    const community = await Community.findById(communityId);
    const errors = validationResult(req);
    console.log(user);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array()
      throw error;
    } else {
      const post = new Post({
        title,
        content,
        community: communityId,
        authorId: req.userId,
        author: user.username,
        communityName: community.name
      });
      await post.save();
      res.status(201).json({ msg: 'Post succesfully added', postId: post._id });
    }
  } catch (err) {
    console.log(err);
    next(err);
    // errorFunc(err, next);
  }
};
exports.getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    mongoose.Types.ObjectId;
    res.status(200).json({ post });
  } catch (err) {
    console.log(err);
    // errorFunc(err, next);
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log(postId)
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ msg: 'Post Deleted' });
  } catch (err) {
    console.log(err);
    // errorFunc(err, next);
  }
};
exports.editPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array()
      throw error;
    } else {
      const { title, content } = req.body;
      const { postId } = req.params;
      const post = {
        title,
        content
      };
      await Post.findOneAndUpdate({ _id: postId }, post);
      res.status(201).json({ msg: 'updated' });
    }
  } catch (err) {
    next(err);
    console.log(err)
  }
};
const includesCheck = (arr, id) => {
  const check = arr.find(itemId => {
    return itemId.equals(id);
  });
  console.log(check,'check')
  return check;
};
exports.upvote = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const user = await User.findById(req.userId).select("-password")
    const {upvotes,downvotes} =  await user.voteHandler(postId,'upvote')
    res.status(200).json({ postUpvotes: upvotes,postDownvotes:downvotes,userData:user });
  } catch (err) {
    console.log(err);
    // errorFunc(err, next);
  }
};

exports.downvote = async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log(postId)
    const user = await User.findById(req.userId).select("-password")
   const {upvotes,downvotes} =  await user.voteHandler(postId,'downvote')
    res.status(200).json({ postUpvotes: upvotes,postDownvotes:downvotes,userData:user });
  } catch (err) {
    console.log(err);
    // errorFunc(err, next);
  }
};

