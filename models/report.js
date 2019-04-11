const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  ruleId: {
      type: Schema.Types.ObjectId,
      ref: 'Rule',
      required: true
    },
  communityId: {
    type: Schema.Types.ObjectId,
    ref: 'Community',
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Community',
    required: true
  },
  author: {
    type:String,
    required:true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportAuthorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Report', reportSchema);
