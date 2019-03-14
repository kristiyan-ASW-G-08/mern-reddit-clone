const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  cakeDay: {
    type: Date,
    default: Date.now
  },
  karma: {
    type: Number,
    default: 0
  },
  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Community'
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  upvoted: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  downvoted: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

userSchema.methods.subscribe = function(communityId) {
  const updatedCommunities = [...this.communities, communityId];
  this.communityId = updatedCommunities;
  return this.save();
};

userSchema.methods.unsubscribe = function(unsubscribeId) {
  const updatedCommunities = this.communities.filter(
    communityId => communityId !== unsubscribeId
  );
  this.communities = updatedCommunities;
  return this.save();
};
module.exports = mongoose.model('User', userSchema);
