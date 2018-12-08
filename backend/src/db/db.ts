import * as Sequelize from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

import {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT,
    PROD
} from '../tools/constants';

import { IUser, IInvoice, IConfig } from '@isofocus/interfaces';
import { IInstance } from './models/instance';

export interface IModels {
    user: Sequelize.Model<IInstance<IUser> & {
        setInvoices(invoices: any[]),
        getInvoices(),
        getConfig(),
        setConfig(config: IConfig),
    }, IUser>;
    invoice: Sequelize.Model<IInstance<IInvoice>, IInvoice>;
    config: Sequelize.Model<IInstance<IConfig>, IConfig>;
}

class DB {
    public sequelize: Sequelize.Sequelize;
    public models: IModels;

    constructor() {
        this.models = {} as any;
        this.sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
            host: DB_HOST,
            dialect: DB_DIALECT,
            pool: {
                max: 20,
                min: 1,
                acquire: 30000,
                idle: 10000
            },
            operatorsAliases: false
        });
        this.createModels();
        this.init().then();
    }

    /**
     * PUBLIC
     */
    public async init() {
        await this.createDatabase();
        await this.sequelize.sync();
        await this.createDefaultValues();
    }

    /**
     * PRIVATE
     */
    private async createDefaultValues() {
        if (!PROD) {
            if (await db.models.user.count() === 0) {
                const miguel = await db.models.user.create({ name: 'Miguel Moya Ortega', email: 'miguelmoyaortega@gmail.com', nick: 'miguelmo', password: bcrypt.hashSync('1234', 10), root: true, dni: '48778194R' });
                const invoice0 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', nameCompany: 'Boon', iva: 21, price: 1936, received: false, date: new Date('12/12/2018') });
                const invoice1 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 21, price: 347, nameCompany: 'Boon', date: new Date('8/8/2018') });
                const invoice2 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 21, price: 282, nameCompany: 'Boon', date: new Date('10/10/2018') });
                const invoice3 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 21, price: 445, nameCompany: 'Boon', received: false, date: new Date('9/9/2018') });
                const invoice4 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 21, price: 887, nameCompany: 'Boon' });
                const invoice5 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 21, price: 1936, nameCompany: 'Boon', received: true, });
                const invoice6 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 21, price: 66, nameCompany: 'Boon' });
                const invoice7 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 21, price: 1553, nameCompany: 'Boon', date: new Date('12/5/2018') });

                await miguel.setInvoices([invoice1, invoice0, invoice2, invoice3, invoice4, invoice5, invoice6, invoice7]);
            }
        }
    }

    private async createDatabase() {
        let seq = new Sequelize('', DB_USERNAME, DB_PASSWORD, {
            host: DB_HOST,
            dialect: DB_DIALECT,
            pool: {
                max: 1,
                min: 1,
                acquire: 30000,
                idle: 10000
            },
            operatorsAliases: false
        });
        await seq.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        await seq.sync();
        await seq.close();
    }

    private createModels() {
        const dirname = `${__dirname}/models`;

        fs.readdirSync(dirname).filter(f => f !== path.basename(module.filename)).forEach(f => {
            const model = this.sequelize.import(path.join(dirname, f));
            this.models[model.name] = model;
        });

        this.models.user.hasMany(this.models.invoice, { foreignKey: 'userID' });
        this.models.invoice.belongsTo(this.models.user, { foreignKey: 'userID' });

        this.models.config.belongsTo(this.models.user, { foreignKey: 'userID' });
        this.models.user.hasOne(this.models.config, { foreignKey: 'userID' });
    }
}

const db = new DB();
export { db };