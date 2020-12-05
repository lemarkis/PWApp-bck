import PushController from '../controllers.push.controller';
import express = require('express'); // eslint-disable-line import/order

class PushRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.init();
  }

  private init(): void {
    this.router.post('/subscribe', PushController.subscribe);
  }
}

export default new PushRouter().router;
