import { Router, Request, Response, NextFunction } from 'express';
import * as child_process from 'child_process';

export class WebhookController {
    router: Router;
    /**
     * Web hook controller for automatic docker pull
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * Default web hook endpoint
     * @param req Request context
     * @param res Response interface
     * @param next Next handler in middleware (Don't use if you don't know what you are doing)
     */
    public pull(request: Request, response: Response, nextFunc: NextFunction) {
        child_process.spawn('sh', ['commands/docker-pull.sh'], { stdio: 'inherit' });
        response.sendStatus(200);
    }

    init() {
        this.router.post('/', this.pull);
    }
}

export default WebhookController;