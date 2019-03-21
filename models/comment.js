const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
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
  postId:{
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  postTitle: {
    type: String,
    ref: 'Post',
    required: true
  },
  communityId: {
    type: Schema.Types.ObjectId,
    ref: 'Community',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

module.exports = mongoose.model('Comment', commentSchema);
