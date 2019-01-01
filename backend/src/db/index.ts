import 'reflect-metadata';
import { createConnection, Repository } from 'typeorm';
import { User } from './models/user';
import { Invoice } from './models/invoice';
import { DB_PORT, DB_DIALECT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, PROD } from '../app.constants';
import { Config } from './models/config';
import { InvoiceLine } from './models/invoiceLine';

class DB {
    models: {
        users?: Repository<User>,
        invoices?: Repository<Invoice>,
        configs?: Repository<Config>,
        invoiceLine?: Repository<InvoiceLine>,
    };

    constructor() {
        this.models = {
            users: undefined,
            invoices: undefined,
            configs: undefined,
        };

        createConnection({
            type: DB_DIALECT,
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_NAME,
            entities: [
                User,
                Invoice,
                Config,
                InvoiceLine,
            ],
            logging: !PROD,
            extra: {
                connectionLimit: 20,
            }
        }).then(connection => {
            this.models.users = connection.getRepository(User);
            this.models.invoices = connection.getRepository(Invoice);
            this.models.configs = connection.getRepository(Config);
            this.models.invoiceLine = connection.getRepository(InvoiceLine);
        }).catch();
    }
}

const db = new DB();
export { db };


/**
 * INVOICE
 * INVOICE LINE
 */