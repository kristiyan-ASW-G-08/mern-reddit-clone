const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  Post  = require('./post')
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
  ]
});

userSchema.methods.subscribe = function(communityId) {
  const updatedCommunities = [...this.communities, communityId];
  this.communities = updatedCommunities;
  this.save();
};

userSchema.methods.unsubscribe = function(communityId) {
  const id = mongoose.Types.ObjectId(communityId);
  const updatedCommunities = this.communities.filter(
    community => !community.equals(id)
  );
  this.communities = updatedCommunities;
  this.save();
};

userSchema.methods.checkSubscriptions = function(communityId) {
  const id = mongoose.Types.ObjectId(communityId);
  const subscribeCheck = this.communities.find(community => {
    return community.equals(id);
  });
  return subscribeCheck;
};

const includesCheck = (arr, id) => {
  const check = arr.find(itemId => {
    return itemId.equals(id);
  });
  return check;
};
userSchema.methods.voteHandler = async function(postId, type) {
  const post = await  Post.findById(postId)
  const id = mongoose.Types.ObjectId(postId);
  if (type === 'upvote') {
    if (includesCheck(this.upvoted, id)) {
      this.upvoted = this.upvoted.filter(upvotedId => !upvotedId.equals(id))
      post.upvotes--
    } else if (includesCheck(this.downvoted, id)) {
      this.downvoted = this.downvoted.filter(downvotedId => !downvotedId.equals(id));
      this.upvoted = [...this.upvoted, id];
      post.downvotes--
      post.upvotes++
    } else {
      this.upvoted = [...this.upvoted, id];
      post.upvotes++
    }
  } else if (type === 'downvote') {
    if (includesCheck(this.downvoted, id)) {
      this.downvoted = this.downvoted.filter(downvotedId => !downvotedId.equals(id));
      post.downvotes--
    } else if (includesCheck(this.upvoted, id)) {
      this.upvoted = this.upvoted.filter(upvotedId => !upvotedId.equals(id));
      this.downvoted = [...this.downvoted, id];
      post.downvotes++
      post.upvotes--
    } else {
      this.downvoted = [...this.downvoted, id];
      post.downvotes++
    }
  }
  await post.saveVoteChanges()
  await this.save()
  return {upvotes:post.upvotes,downvotes:post.downvotes}
};

userSchema.methods.saveHandler = function(postId) {
  const id = mongoose.Types.ObjectId(postId);
  if(includesCheck(this.saved,id)){
    this.saved = this.saved.filter(savedPostId => !savedPostId.equals(id));
  }else {
    this.saved = [...this.saved,id]
  }
  this.save()
};
module.exports = mongoose.model('User', userSchema);
