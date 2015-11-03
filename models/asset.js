var mongoose = require('mongoose');

var assetSchema = new mongoose.Schema({
  name: String,
  uri: String,
  adventure: String,
  comments: [{
    user: String,
    date: Date,
    body: String
  }],
});

var Asset = module.exports = exports = mongoose.model('Asset', assetSchema);