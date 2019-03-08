const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  image: {
    type: String
  },
  link: {
    type: String
  },
  upvotes:{
      type:Number,
      default:0,
  },
  downvotes:{
    type:Number,
    default:0,
},
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

module.exports = mongoose.model('Post', postSchema);
