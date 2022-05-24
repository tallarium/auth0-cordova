var Browser;
try {
  Browser = require('@capacitor/browser').Browser;
} catch (e) {
  // ignore
}

function CapacitorBrowser() {
  if (!Browser) {
    throw new Error('To run with Capacitor install @capacitor/browser');
  }
  this.handler = null;
  this.open = this.open.bind(this);
  this.handleFirstLoadEnd = this.handleFirstLoadEnd.bind(this);
  this.handleExit = this.handleExit.bind(this);
  this.clearEvents = this.clearEvents.bind(this);
  this.close = this.close.bind(this);
}

CapacitorBrowser.prototype.open = function (url, handler) {
  Browser.open({ url: url }, '_blank');

  Browser.addListener('browserPageLoaded', this.handleFirstLoadEnd);
  Browser.addListener('browserFinished', this.handleExit);
  this.handler = handler;
};

CapacitorBrowser.prototype.handleFirstLoadEnd = function () {
  this.handler(null, { event: 'loaded' });
};

CapacitorBrowser.prototype.handleExit = function () {
  this.clearEvents();
  this.handler(null, { event: 'closed' });
};

CapacitorBrowser.prototype.clearEvents = function () {
  Browser.removeAllListeners();
};

CapacitorBrowser.prototype.close = function () {
  this.clearEvents();
  this.handler = null;
};

module.exports = CapacitorBrowser;
