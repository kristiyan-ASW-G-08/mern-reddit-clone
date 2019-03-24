const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'logo.svg'
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
  moderators: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  rules: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Rule'
    }
  ]
});

const includesCheck = (arr, id) => {
  const check = arr.find(itemId => {
    return itemId.equals(id);
  });
  return check;
};
CommunitySchema.methods.incrementSubscribers = function() {
  this.subscribers++
  this.save();
};

CommunitySchema.methods.descrementSubscribers = function() {
  if(this.subscribers >0){
    this.subscribers--
  }
  this.save();
};
CommunitySchema.methods.reportSpam = function(spamPostId) {
  const id = mongoose.Types.ObjectId(spamPostId);
  if(includesCheck(this.spam,id)){
    return false
  }else {
    this.spam = [...this.spam,spamPostId]
  this.save();
  return true
  }
};

module.exports = mongoose.model('Community', CommunitySchema);
