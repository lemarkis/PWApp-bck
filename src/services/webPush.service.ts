import webpush from 'web-push';
import vapidConfig from '../configs/vapid.config.json';

class WebPush {
  private wp;

  constructor() {
    this.wp = webpush;
    this.wp.setVapidDetails(
      vapidConfig.subject,
      vapidConfig.publicKey,
      vapidConfig.privateKey,
    );
  }

  public sendNotification(
    subscription: webpush.PushSubscription,
    payload?: string | Buffer | null | undefined,
    options?: webpush.RequestOptions | undefined,
  ): Promise<webpush.SendResult> {
    return this.wp.sendNotification(subscription, payload, options);
  }
}

export default new WebPush();
