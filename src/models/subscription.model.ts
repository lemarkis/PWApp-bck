import {
  Document,
  model,
  Model,
  Schema,
} from 'mongoose';
import { PushSubscription } from 'web-push';

const KeysSchema = new Schema({
  p256dh: { type: String, required: true },
  auth: { type: String, required: true },
});

const PushSubSchema = new Schema({
  endpoint: { type: String, required: true },
  keys: { type: KeysSchema, required: true },
});

const SubscriptionSchema = new Schema({
  user_id: { type: String, required: true },
  sub: { type: PushSubSchema, required: true },
});

SubscriptionSchema.set('toJSON', { virtuals: true });

export interface ISubscription {
  user_id: string;
  sub: PushSubscription;
}

export interface SubscriptionDocument extends ISubscription, Document {}

export interface SubscriptionModel extends Model<SubscriptionDocument> {}

export default model<SubscriptionDocument, SubscriptionModel>('Subscription', SubscriptionSchema);
