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
  communityId: {
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
  imageUrl: {
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


postSchema.methods.saveVoteChanges = function(){
  this.save()
}

postSchema.methods.incrementComments = function(){
  this.comments++
  this.save()
}
postSchema.methods.decrementComments = function(){
  this.comments--
  this.save()
}
module.exports = mongoose.model('Post', postSchema);
