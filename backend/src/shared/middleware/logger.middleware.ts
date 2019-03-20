import { Injectable, NestMiddleware } from '@nestjs/common';
import { PROD } from '../../app.constants';
import * as moment from 'moment';
import { Request, Response } from 'express';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        if (!PROD) {
            console.log(`${moment().format('HH:mm:ss')} [${req.method}]: ${req.baseUrl}`);
        }
        if (typeof next === 'function') next();
    }

}
