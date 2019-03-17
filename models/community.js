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

module.exports = mongoose.model('Community', CommunitySchema);
