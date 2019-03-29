const Post  = require('../models/post')
const User  = require('../models/user')
const Comment =   require('../models/comment')
const mongoose = require('mongoose')
exports.getUserPosts = async (req, res, next) => {
  try {
      
    const {userId} = req.params;
    const {page} = req.query
    console.log(userId)
    const currentPage = page || 1
    const postPerPage = 5
    const posts = await Post.find({authorId:userId}).countDocuments().find().skip((currentPage -1) * postPerPage).limit(postPerPage)
    res.status(200).json({posts}); 
  } 
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
};}
exports.getUserComments = async (req, res, next) => {
    try {
        
      const {userId} = req.params;
      const {page} = req.query
      const currentPage = page || 1
      const postPerPage = 5
      const comments = await Comment.find({authorId:userId}).countDocuments().find().skip((currentPage -1) * postPerPage).limit(postPerPage)
      res.status(200).json({comments}); 
    } 
    catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  };}
  

  exports.getUserSavedPosts = async (req, res, next) => {
    try {
        
      const {userId} = req.params;
      const user = await User.findById(userId)
      const {page} = req.query
      const currentPage = page || 1
      const postPerPage = 5
      const populatedUser = await user.populate('saved').execPopulate()
      const posts = populatedUser.saved
      console.log(posts)
      // const {page} = req.query
      // const currentPage = page || 1
      // const postPerPage = 5
      // const comments = await Comment.find({authorId:userId}).countDocuments().find().skip((currentPage -1) * postPerPage).limit(postPerPage)
      res.status(200).json({posts}); 
    } 
    catch (err) {
      console.log(err)
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  };}
  
  
  
  exports.getUserUpvotedPosts = async (req, res, next) => {
    try {
        
      const {userId} = req.params;
      const user = await User.findById(userId)
      const {page} = req.query
      const currentPage = page || 1
      const postPerPage = 5
      const populatedUser = await user.populate('upvoted').execPopulate()
      const posts = populatedUser.upvoted
      console.log(posts)
      // const {page} = req.query
      // const currentPage = page || 1
      // const postPerPage = 5
      // const comments = await Comment.find({authorId:userId}).countDocuments().find().skip((currentPage -1) * postPerPage).limit(postPerPage)
      res.status(200).json({posts}); 
    } 
    catch (err) {
      console.log(err)
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  };}


  exports.getUserDownvotedPosts = async (req, res, next) => {
    try {
        
      const {userId} = req.params;
      const user = await User.findById(userId)
      const {page} = req.query
      const currentPage = page || 1
      const postPerPage = 5
      const populatedUser = await user.populate('downvoted').execPopulate()
      const posts = populatedUser.downvoted
      console.log(posts)
      // const {page} = req.query
      // const currentPage = page || 1
      // const postPerPage = 5
      // const comments = await Comment.find({authorId:userId}).countDocuments().find().skip((currentPage -1) * postPerPage).limit(postPerPage)
      res.status(200).json({posts}); 
    } 
    catch (err) {
      console.log(err)
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  };}

  exports.getUserCommunities = async (req, res, next) => {
    try {
        
      const {userId} = req.params;
      const user = await User.findById(userId)
      const {page} = req.query
      const currentPage = page || 1
      const postPerPage = 5
      const populatedUser = await user.populate('communities').execPopulate()
      const communities = populatedUser.communities
      console.log(communities)
      // const {page} = req.query
      // const currentPage = page || 1
      // const postPerPage = 5
      // const comments = await Comment.find({authorId:userId}).countDocuments().find().skip((currentPage -1) * postPerPage).limit(postPerPage)
      res.status(200).json({communities}); 
    } 
    catch (err) {
      console.log(err)
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  };}
  
  exports.subscribe = async (req, res, next) => {
    try {
      console.log('sub')
      const {communityId}  =  req.params
      const user = await User.findById(req.userId).select("-password")
      const community = await Community.findById(communityId)
      if(user.checkSubscriptions(communityId)){
        const error = new Error('User is already subscribed');
        error.statusCode = 500 ;
        throw error;
      }else {
        await community.incrementSubscribers()
        await user.subscribe(communityId)
      res.status(201).json({ message: 'Subscribed',userData:user});
      }
      
    } 
    catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  };}
  
  exports.unsubscribe = async (req, res, next) => {
      try{
        console.log('unsub')
      const {communityId}  = req.params
      const community = await Community.findById(communityId)
      const user = await User.findById(req.userId).select("-password")
      await community.descrementSubscribers()
      await user.unsubscribe(communityId)
      res.status(201).json({ message: 'Unsubscribed',userData:user});
     }
      catch(err){
          console.log(err)
      }
      
  }
  
  
  exports.save = async (req, res, next) => {
    try {
      const {postId}  =  req.params
      const user = await User.findById(req.userId).select("-password")
      await user.saveHandler(postId)
      res.status(200).json({userData:user});
    } 
    catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  };}
  
  