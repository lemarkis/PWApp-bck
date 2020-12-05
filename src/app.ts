import morgan from 'morgan';
import cors from 'cors';
import jwtCheck from './middlewares/jwtCheck';
import apiRouter from './routers/api.router';
import express = require('express'); // eslint-disable-line import/order

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initGlobalMiddlewares();
    this.app.use('/api', apiRouter);
  }

  private initGlobalMiddlewares(): void {
    this.app.use(express.json({ limit: '200mb' }));

    // Request logger
    this.app.use(morgan('dev'));

    // CORS
    const corsOptions: cors.CorsOptions = {
      origin: '*',
    };
    this.app.use(cors(corsOptions));

    // JWT
    this.app.use(jwtCheck);
  }
}

export default new App().app;
