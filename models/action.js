var mongoose = require('mongoose');

var actionSchema = new mongoose.Schema({
  name: String,
  originAsset: String,
  targetAsset: String,
  activated: Boolean
});

var Action = module.exports = exports = mongoose.model('Action', actionSchema);
