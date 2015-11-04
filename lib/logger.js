'use strict';

var fs = require('fs');
var instance;

module.exports = exports = function(data) {
  if (!instance) {
    instance = new Logger();
  }
  instance.log(data);
};

function Logger() {
  var logQueue = [];

  var logDir = process.env.LOG_DIR;
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  this.log = function(data) {
    var date = new Date();
    logQueue.push({date: date, data: data});
    instance.save();
  };

  this.save = function() {
    while (logQueue.length) {
      var logItem = logQueue.shift();
      var logLine = logItem.date.toLocaleString() + ' ' +
                    logItem.data + '\n';
      var now = new Date();
      var filename = logDir + '/' + (now.getMonth() + 1) + '.' + now.getDate() +
                     '.' + now.getFullYear();
      fs.appendFile(filename, logLine);
    }
  };
}
