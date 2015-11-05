module.exports = function(app) {
  require('./rest_service')(app);
  require('./persist_service')(app);
};
