const Community  = require('../models/community')
const User =   require('../models/user')
exports.subscribe = async (req, res, next) => {
  try {
    const {communityId}  = req.body
    const user = await User.findById(req.userId)
    await user.subscribe(communityId)
    res.status(201).json({ message: 'Subscribed'});
  } 
  catch (err) {
      console.log(err)
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
};}

exports.unsubscribe = async (req, res, next) => {
    try{
    const {communityId}  = req.body
    const user = await User.findById(req.userId)
    await user.unsubscribe(communityId)
    res.status(201).json({ message: 'Unsubscribed'});
   }
    catch(err){
        console.log(err)
    }
    
}


