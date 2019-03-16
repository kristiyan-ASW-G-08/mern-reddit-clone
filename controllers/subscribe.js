const Community  = require('../models/community')
const User =   require('../models/user')
exports.subscribe = async (req, res, next) => {
  try {
    const {communityId}  = req.params
    const user = await User.findById(req.userId).select("-password")
    
    if(user.checkSubscriptions(communityId)){
      const error = new Error('User is already subscribed');
      error.statusCode = 500 ;
      throw error;
    }else {
      await user.subscribe(communityId)
    res.status(201).json({ message: 'Subscribed',userData:user});
    }
    
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
    const {communityId}  = req.params
    const user = await User.findById(req.userId).select("-password")
    await user.unsubscribe(communityId)
    res.status(201).json({ message: 'Unsubscribed',userData:user});
   }
    catch(err){
        console.log(err)
    }
    
}


