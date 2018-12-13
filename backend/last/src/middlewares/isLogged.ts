import * as express from 'express';
import { Auth } from '../classes/auth';
const isLogged = express.Router();

isLogged.use((req, res, next) => {
    let headers = req.headers.authorization;
    if (headers === undefined || headers === '') next({ type: 'logged', error: 'You aren\'t logged in to the app', status: 403 });
    else {
        headers = headers.replace('Bearer ', '');
        if (!Auth.verify(headers)) next({ type: 'logged', error: 'Your token expired', status: 403 });
        next();
    }
});

export { isLogged };