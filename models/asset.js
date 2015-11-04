var mongoose = require('mongoose');

var assetSchema = new mongoose.Schema({
  name: String,
  uri: String,
  thumburi: String,
  adventure: String,
  unlocked: Boolean,
  type: String,
  coordinates: {
    x: Number,
    y: Number
  },
  comments: [{
    user: String,
    date: Date,
    body: String
  }],
  description: String
});

var Asset = module.exports = exports = mongoose.model('Asset', assetSchema);
