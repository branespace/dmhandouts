module.exports = function(app) {
  require('./controllers/signup_controller')(app);
  require('./controllers/signin_controller')(app);
  require('./controllers/userMain_controller')(app);
};
