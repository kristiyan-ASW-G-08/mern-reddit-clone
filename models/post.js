const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  author: {
    type:String,
    ref: 'User',
    required: true
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community',
    required: true
  },
  communityName: {
    type: String,
    ref: 'Community',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  image: {
    type: String
  },
  link: {
    type: String
  },
  comments:{
    type:Number,
    default:0,
},
  upvotes:{
      type:Number,
      default:0,
  },
    creationDate: {
    type: Date,
    default: Date.now
  },
  downvotes:{
    type:Number,
    default:0,
},

});
postSchema.methods.incrementUpvotes = function() {
  this.upvotes++
  this.save();
};

postSchema.methods.incrementDownvotes = function() {
  this.downvotes++
  this.save();
};

postSchema.methods.decrementUpvotes = function() {
  if(this.upvotes > 0){
    this.upvotes--
  this.save();
  }
  
};

postSchema.methods.decrementDownvotes = function() {
  if(this.downvotes > 0){
    this.downvotes--
  this.save();
  }
};
postSchema.methods.equalizeDownvotesAndUpvotes = function() {
  this.downvotes--
  this.upvotes--
  this.save();
};


module.exports = mongoose.model('Post', postSchema);
