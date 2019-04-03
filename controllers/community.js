const Community = require('../models/community');
const Post = require('../models/post');
const { validationResult } = require('express-validator/check');
const errorsIsEmpty = require('../util/errorsIsEmpty')
exports.createCommunity = async (req, res, next) => {
  try {
    errorsIsEmpty(validationResult(req))
    const { name, description } = req.body;
    const community = new Community({
      name,
      description,
      creator: req.userId
    });
    await community.save();
    res
      .status(201)
      .json({ communityName: community.name, communityId: community._id });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCommunity = async (req, res, next) => {
  try {
    const { communityName } = req.params;
    const community = await Community.findOne({ name: communityName });
    if (!community) {
      const error = new Error('Could not find community.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ community });
  } catch (err) {
    console.log(err);
  }
};
exports.getPosts = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const { page } = req.query;
    console.log(page);
    const currentPage = page || 1;
    const postPerPage = 5;
    const posts = await Post.find({ community: communityId })
      .countDocuments()
      .find()
      .skip((currentPage - 1) * postPerPage)
      .limit(postPerPage);
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
  }
};
exports.reportSpam = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { communityId } = req.body;
    const community = await Community.findById(communityId);
    const reportStatus = await community.reportSpam(postId);
    if (reportStatus) {
      res.status(200).json({ msg: 'Post has been reported' });
    } else {
      res
        .status(200)
        .json({ msg: 'Post has already been reported been reported' });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getSpamPosts = async (req, res, next) => {
  try {
    const { communityId } = req.params;
    const community = await Community.findById(communityId);
   const populatedCommunity =  await community.populate('spam').execPopulate()
   const posts = populatedCommunity.spam
   res.status(200).json({posts}); 
  } catch (err) {
    console.log(err);
  }
};
