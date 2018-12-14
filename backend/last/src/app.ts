import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as fs from 'fs';

import { PROD, PORT, ROUTE_PRIVKEY, ROUTE_CERT } from './tools/constants';
import { user } from './routes/user/user';
import { auth } from './routes/auth/auth';
import { setHeaders } from './middlewares/setHeaders';
import { isLogged } from './middlewares/isLogged';
import { setLogger } from './middlewares/setLogger';
import { errorHandler } from './middlewares/errorHandler';
import { invoice } from './routes/invoce/invoice';
import { config } from './routes/config/config';

class App {
    app = express();
    io;
    constructor() {
        let server;

        if (!PROD) {
            server = require('http').Server(this.app);
        } else {
            // tslint:disable-next-line:one-variable-per-declaration
            const key = fs.readFileSync(ROUTE_PRIVKEY, 'utf8'),
                cert = fs.readFileSync(ROUTE_CERT, 'utf8'),
                credentials = { key, cert };
            server = require('https').Server(credentials, this.app);
        }
        this.io = require('socket.io')(server.listen(PORT));
        this.init();
    }

    public async init() {
        this.setExternalMiddlewares();
        this.setCustomMiddlewares();

        this.setRoutesWithoutLogin();

        this.setRoutesWithLogin();

        this.setErrorHandler();
        this.setDefaultError();
    }

    private setCustomMiddlewares() {
        this.app.use(setHeaders);
        this.app.use(setLogger);
    }

    private setExternalMiddlewares() {
        this.app.use((req, res, next) => {
            req['io'] = this.io;
            next();
        });
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({ limit: '15mb' }));
    }

    private setRoutesWithoutLogin() {
        this.app.use('/auth', auth);
    }

    private setRoutesWithLogin() {
        this.app.use(isLogged);
        this.app.use('/user', user);
        this.app.use('/invoice', invoice);
        this.app.use('/config', config);
    }

    private setErrorHandler() {
        this.app.use(errorHandler);
    }

    private setDefaultError() {
        this.app.all('*', (req, res) => res.status(404).json({ error: 'Service not found' }));
    }
}

new App();
