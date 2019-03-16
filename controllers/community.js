const Community  = require('../models/community')
const Post  = require('../models/post')
const { validationResult } = require('express-validator/check');
exports.createCommunity = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log(req.body)
    if (!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const {name,description} = req.body
    const community = new Community({
      name,
      description,
      creator: req.userId
    });
    await community.save();
    res.status(201).json({communityName: community.name,communityId:community._id});
  } 
  catch (err) {
      console.log(err)
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
};}

exports.getCommunity = async (req, res, next) => {
    try{
    const {communityName} = req.params;
   const community =  await Community.findOne({name:communityName})
   if(!community){
    const error = new Error('Could not find community.');
    error.statusCode = 404;
    throw error;
   }
   res.status(200).json({ community });
      
    }
    catch(err){
        console.log(err)
    }
    
}
 
exports.getPosts = async (req,res,next) => {
  try{
    const {communityId} = req.params;
    const posts = await Post.find({community:communityId})
    res.status(200).json({posts}); 
  }
  catch(err){
    console.log(err)
  }
}
