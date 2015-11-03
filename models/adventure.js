var mongoose = require('mongoose');

var adventureSchema = new mongoose.Schema({
  title: String,
});

var Adventure = module.exports = exports =
    mongoose.model('Adventure', adventureSchema);
