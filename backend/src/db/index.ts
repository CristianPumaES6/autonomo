import 'reflect-metadata';
import { createConnection, Repository } from 'typeorm';
import { User } from './models/user';
import { Invoice } from './models/invoice';
import { DB_PORT, DB_DIALECT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, PROD } from '../app.constants';
import { Config } from './models/config';

interface IModel {
    users?: Repository<User>;
    invoices?: Repository<Invoice>;
    configs?: Repository<Config>;
}

class DB {
    models: {
        users: Repository<User>,
        invoices: Repository<Invoice>,
        configs: Repository<Config>,
    } = {} as {
        users: Repository<User>,
        invoices: Repository<Invoice>,
        configs: Repository<Config>,
    };

    constructor() {
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
                Config,
            ],
            logging: !PROD,
            extra: {
                connectionLimit: 20,
            },
        }).then(connection => {
            const repos: IModel = {};
            repos.users = connection.getRepository(User);
            repos.invoices = connection.getRepository(Invoice);
            repos.configs = connection.getRepository(Config);

            this.models = repos as {
                users: Repository<User>,
                invoices: Repository<Invoice>,
                configs: Repository<Config>,
            };
        }).catch();
    }
}

const db = new DB();
export { db };
