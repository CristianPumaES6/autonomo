import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { PROD } from '../../app.constants';
import * as moment from 'moment';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            if (!PROD) {
                // tslint:disable-next-line:no-console
                console.log(`${moment().format('HH:mm:ss')} [${req.method}]: ${req.path}`);
            }
            next();
        };
    }
}
