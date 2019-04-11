const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const includesCheck = require('../util/includesCheck')
const communitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'images/logo.svg'
  },
  subscribers: {
    type: Number,
    default: 0
  },
  spam:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  description: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rules: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Rule'
    }
  ],
  bannedUsers:[
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

communitySchema.methods.incrementSubscribers = function() {
  this.subscribers++
  this.save();
};

communitySchema.methods.decrementSubscribers = function() {
  if(this.subscribers >0){
    this.subscribers--
  }
  this.save();
};
communitySchema.methods.reportSpam = function(spamPostId) {
  const id = mongoose.Types.ObjectId(spamPostId);
  if(includesCheck(this.spam,id)){
    return false
  }else {
    this.spam = [...this.spam,spamPostId]
  this.save();
  return true
  }
};

communitySchema.methods.banHandler = function(userId,type) {
  const id = mongoose.Types.ObjectId(userId);

  const check = includesCheck(this.bannedUsers,id)
  if(check && type === 'unban'){
    this.bannedUsers = this.bannedUsers.filter(communityBanId => !communityBanId.equals(id));
  }else if(!check && type === 'ban') {
    this.bannedUsers = [...this.bannedUsers,id]
  }else {
    const msg = type === 'ban' ? 'This user is already banned!' : "This user wasn't banned!"
    return {msg}
  }
  this.save()
};

module.exports = mongoose.model('Community', communitySchema);
