import testRouter from './test.router';
import taskRouter from './task.router';
import pushRouter from './push.router';
import express = require('express'); // eslint-disable-line import/order

class APIRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.init();
  }

  private init(): void {
    this.router.use('/test', testRouter);
    this.router.use('/task', taskRouter);
    this.router.use('/push', pushRouter);
  }
}

export default new APIRouter().router;
