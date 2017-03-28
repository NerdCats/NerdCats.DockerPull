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

        let resStream: string = "";

        proc.stdout.addListener('data', (data) => {
            resStream += data.toString().trim();
            var lines = resStream.split("\n");
            for (var i in lines) {
                if (i.trim().length) {
                    response.write('stdout: ' + lines[i] + "\n");
                    console.log('data: ' + lines[i]);
                }
            }
        });

        proc.stderr.addListener('data', (data) => {
            response.status(500);
            response.write('ERR:' + data);
            console.log('ERR:' + data);
        });

        proc.addListener('exit', (code) => {
            response.end('child process exited with code ' + code);
            console.log('child process exited with code ' + code);
        });
    }

    init() {
        this.router.post('/', this.pull);
    }
}

export default WebhookController;