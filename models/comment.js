var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  user: String,
  asset: String,
  body: String,
  date: Date
});

var comment = module.exports = exports =
  mongoose.model('Comment', commentSchema);
