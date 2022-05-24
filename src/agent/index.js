var BrowserAgent = require('./browser');
var WebViewAgent = require('./webview');
var CapacitorAgent = require('./capacitor');

module.exports = function getAgent(callback) {
  if (window.Capacitor) {
    return callback(null, new CapacitorAgent());
  } else {
    return BrowserAgent.isAvailable(function (available) {
      if (available) {
        return callback(null, new BrowserAgent());
      }
      return callback(null, new WebViewAgent());
    });
  }
};

