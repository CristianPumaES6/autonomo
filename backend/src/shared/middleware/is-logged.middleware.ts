import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { auth } from '../classes/auth';
import { Request, Response } from 'express';

@Injectable()
export class IsLoggedMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        const headers = req.headers.authorization;
        if (headers === undefined || headers === '') {
            res.status(HttpStatus.NOT_ACCEPTABLE)
                .json({ message: 'No estás logeado en la app', statusCode: HttpStatus.NOT_ACCEPTABLE });
        } else {
            try { auth.decode(headers); }
            catch (e) { res.status(e.status).json({ statusCode: e.status, message: e.message }); }
        }
        if (typeof next === 'function') next();
    }
}
