const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const photoSchema = new Schema(
  {
    photoText: {
      type: //THIS WILL BE FOR THE PHOTO ,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

photoSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Photo = model('Photo', photoSchema);

module.exports = Photo;