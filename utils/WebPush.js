const vapidDetails = require('../vapid-details.json');


class WebPush {
  constructor() {
    this.wp = require('web-push');
    this.wp.setVapidDetails(
      vapidDetails.subject,
      vapidDetails.publicKey,
      vapidDetails.privateKey
    );
  }

  sendNotification(subscription, payload, options) {
    this.wp.sendNotification(subscription, payload, options);
  }
}

module.exports = new WebPush();