import TaskController from '../controllers/task.controller';
import express = require('express'); // eslint-disable-line import/order

class TaskRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.init();
  }

  private init(): void {
    this.router.get('/', TaskController.getByUser);
    this.router.post('/', TaskController.createOrUpdate);
    this.router.delete('/', TaskController.delete);
  }
}

export default new TaskRouter().router;
