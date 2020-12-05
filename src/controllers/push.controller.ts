import { Request, Response } from 'express';
import { SubscriptionDocument } from '../models/subscription.model';
import SubscriptionService from '../services/subscription.service';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export default class PushController {
  public static async subscribe(req: AuthenticatedRequest, res: Response): Promise<void> {
    const sub: SubscriptionDocument | null = await SubscriptionService.createSubscription({
      sub: req.body,
      user_id: req.user.sub,
    });

    res.status(200).json(sub);
  }
}
