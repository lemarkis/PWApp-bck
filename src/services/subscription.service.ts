import Subscription, { ISubscription, SubscriptionDocument } from '../models/subscription.model';

class SubscriptionService {
  public static async getSubscriptionByUserId(id: string): Promise<SubscriptionDocument[]> {
    return Subscription.find({ user_id: id }).exec();
  }

  public static async createSubscription(subscription: ISubscription):
  Promise<SubscriptionDocument | null> {
    const exist = await Subscription.find({ user_id: subscription.user_id });
    if (!exist) {
      return Subscription.create(subscription);
    }
    return null;
  }
}

export default SubscriptionService;
