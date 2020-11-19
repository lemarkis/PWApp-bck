import { Request, Response } from 'express';

export default class TestController {
  public static async publicPing(_req: Request, res: Response): Promise<void> {
    res.send('public pong');
  }

  public static async privatePing(_req: Request, res: Response): Promise<void> {
    res.send('private pong');
  }
}
