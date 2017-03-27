import { Router, Request, Response, NextFunction } from 'express';

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
    public pull(req: Request, res: Response, next: NextFunction) {
        res.json({ message: "wee!" });
    }

    init() {
        this.router.post('/', this.pull);
    }
}

const webhookController = new WebhookController();
export default webhookController.router;