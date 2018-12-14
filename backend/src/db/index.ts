import 'reflect-metadata';
import { createConnection, Repository } from 'typeorm';
import { User } from './models/user';
import { Invoice } from './models/invoice';
import { DB_PORT, DB_DIALECT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, PROD } from '../app.constants';

class DB {
    models: {
        users?: Repository<User>,
        invoices?: Repository<Invoice>,
    };

    constructor() {
        this.models = {
            users: undefined,
            invoices: undefined,
        };
        createConnection({
            type: DB_DIALECT,
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_NAME,
            acquireTimeout: 1000,
            entities: [
                User,
                Invoice,
            ],
            synchronize: true,
            logging: !PROD,
        }).then(async connection => {
            this.models.users = connection.getRepository(User);
            this.models.invoices = connection.getRepository(Invoice);
        }).catch();
    }
}

const db = new DB();
export { db };
