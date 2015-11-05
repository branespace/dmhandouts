module.exports = function(app) {
  app.factory('Persist', function() {
    var persistStore = {};
    persistStore.values = {};

    persistStore.set = function(key, value) {
      this.values[key] = value;
    };

    persistStore.get = function(key) {
      return this.values[key];
    };

    return persistStore;

  });
};
