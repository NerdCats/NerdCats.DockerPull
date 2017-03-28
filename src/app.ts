import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

import { WebhookController } from './controllers/webhookController';
// Creates and configures an ExpressJS web server.
class App {
  public auth_token: string;
  // ref to Express instance
  public express: express.Application;
  public webhookController: WebhookController;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.webhookController = new WebhookController();
    this.middleware();
    this.routes();
    this.init();
  }

  authTokenChecker = function (req, res, nextFunc) {
    if (this.auth_token == req.query.token) {
      nextFunc();
    }
    else {
      res.status(401).send('Unauthorized to send webhook requests');
    }
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(this.authTokenChecker.bind(this));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      req.query
      res.json({
        message: 'Welcome to NerdCats docker pull webhook host'
      });
    });
    this.express.use('/', router);
    this.express.use('/pull', this.webhookController.router);
  }

  init() {
    let config = JSON.parse(fs.readFileSync('dist/config.json', 'utf8'));
    if (!config || !config.auth_token) {
      console.error('no configuration or no auth_token in configuration');
      process.exit();
    }
    this.auth_token = config.auth_token;
  }

}

export default new App().express;
