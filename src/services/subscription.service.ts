import Subscription, { ISubscription, SubscriptionDocument } from '../models/subscription.model';

class SubscriptionService {
  public static async getSubscriptionByUserId(id: any): Promise<SubscriptionDocument[]> {
    return Subscription.find({ user_id: id }).exec();
  }

  public static async createSubscription(subscription: ISubscription):
  Promise<SubscriptionDocument | null> {
    return Subscription.create(subscription);
  }
}

export default SubscriptionService;
