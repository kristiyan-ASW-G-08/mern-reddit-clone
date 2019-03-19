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
  communities:[
    {
    type: Schema.Types.ObjectId,
    ref: 'Post'
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
  console.log(updatedCommunities)
  this.communities = updatedCommunities;
  this.save();
};

userSchema.methods.checkSubscriptions = function(communityId){
  const id = mongoose.Types.ObjectId(communityId);
  const subscribeCheck = this.communities.find(community => {
    return community.equals(id)
  })
  return subscribeCheck
}
userSchema.methods.addUpvoted = function(postId) {
  const updatedUpvoted = [...this.upvoted,postId]
  this.upvoted = updatedUpvoted
  this.save()
};
userSchema.methods.removeUpvoted = function(postId) {
  const id = mongoose.Types.ObjectId(postId);
  const updatedUpvoted = this.downvoted.filter(upvotedPostId => !upvotedPostId.equals(id))
  this.upvoted = updatedUpvoted
  this.save()
};
userSchema.methods.addDownvoted = function(postId) {
  const updatedDownvoted = [...this.upvoted,postId]
  this.downvoted = updatedDownvoted
  this.save()
};
userSchema.methods.removeDownvoted = function(postId) {
  const id = mongoose.Types.ObjectId(postId);
  const updatedDownvoted = this.downvoted.filter(downvotedPostId => !downvotedPostId.equals(id))
  this.downvoted = updatedDownvoted
  this.save()
};

userSchema.methods.checkUpvoted = function(postId){
  const id = mongoose.Types.ObjectId(postId);
  const upvotedCheck = this.upvoted.find(post => {
    return post.equals(id)
  })
  return upvotedCheck
}
userSchema.methods.checkDownvoted = function(postId){
  const id = mongoose.Types.ObjectId(postId);
  const downvotedCheck = this.downvoted.find(post => {
    return post.equals(id)
  })
  return downvotedCheck
}

userSchema.methods.equalizeUpdvotesAndDownvotes = function(postId){
  const id = mongoose.Types.ObjectId(postId);
  const updatedDownvoted = this.downvoted.filter(downvotedPostId => !downvotedPostId.equals(id))
  const updatedUpvoted = this.downvoted.filter(upvotedPostId => !upvotedPostId.equals(id))
  this.downvoted = updatedDownvoted;
  this.upvoted = updatedUpvoted;
  this.save()

}
module.exports = mongoose.model('User', userSchema);
