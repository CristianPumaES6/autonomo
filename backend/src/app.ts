import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';

import { PROD, PORT, ROUTE_PRIVKEY, ROUTE_CERT } from './tools/constants';
import { DB } from './db/db';
import { database } from './routes/database/database';
import { user } from './routes/user/user';
import { auth } from './routes/auth/auth';
import { setHeaders } from './middlewares/setHeaders';
import { isLogged } from './middlewares/isLogged';
import { setLogger } from './middlewares/setLogger';
import { errorHandler } from './middlewares/errorHandlet';

const app = express();
let server;

if (!PROD) {
    server = require('http').Server(app);
} else {
    const key = fs.readFileSync(ROUTE_PRIVKEY, 'utf8'),
        cert = fs.readFileSync(ROUTE_CERT, 'utf8'),
        credentials = { key, cert };
    server = require('https').Server(credentials, app);
}
const io = require('socket.io')(server.listen(PORT));

/**
 * INICIALIZE THE DB
 */
DB.init();

/**
 * SET SOCKET.IO TO THE APP
 */
app.use((req, res, next) => {
    req['io'] = io;
    next();
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({ limit: '15mb' }));

/**
 * CUSTOMS MIDDLEWARE
 */
app.use(setHeaders);

app.use(setLogger);

/**
 * ROUTES WITHOUT LOGIN
 */
app.use('/auth', auth);


/**
 * ROUTES WITH LOGIN
 */
app.use(isLogged);

app.use('/database', database);

app.use('/user', user);

/**
 * ERROR HANDLER
 */
app.use(errorHandler);

/**
 * DEFAULT RESPONSE (404)
 */
app.all('*', (req, res) => res.status(404).json({ error: 'Service not found' }));
