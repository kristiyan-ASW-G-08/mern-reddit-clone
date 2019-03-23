const Community  = require('../models/community')
const User =   require('../models/user')
const mongoose = require('mongoose')
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

