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
        let proc = child_process.spawn('sh', ['dist/commands/docker-pull.sh', 'nginx:latest', '-p 5000:80']);
        proc.stdout.on('data', function (data) {
            console.log(data.toString());
        });

        proc.stderr.on('data', function (data) {
            console.log('ERR:' + data.toString());
        });

        proc.on('exit', function (code) {
            console.log('child process exited with code ' + code.toString());
        });

        response.sendStatus(200);
    }

    init() {
        this.router.post('/', this.pull);
    }
}

export default WebhookController;