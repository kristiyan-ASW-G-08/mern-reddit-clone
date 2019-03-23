const Post  = require('../models/post')
const User =   require('../models/user')
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

