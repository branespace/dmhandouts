var mongoose = require('mongoose');

var adventureSchema = new mongoose.Schema({
  title: String,
  unlocked: Boolean
});

var Adventure = module.exports = exports =
    mongoose.model('Adventure', adventureSchema);
