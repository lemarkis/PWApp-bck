import TestController from '../controllers/test.controller';
import express = require('express'); // eslint-disable-line import/order

class TestRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.init();
  }

  private init(): void {
    this.router.get('/publicPing', TestController.publicPing);
    this.router.get('/privatePong', TestController.privatePing);
  }
}

export default new TestRouter().router;
