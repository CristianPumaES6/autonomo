import * as Sequelize from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';

import {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT,
    PROD
} from '../app.constants';

import { IUser, IInvoice, IConfig, IInvoiceLine } from '../../../global/interfaces';
import { IInstance, IUnionConfig, IUnionInvoice } from './instance';

export interface IModels {
    user: Sequelize.Model<IInstance<IUser> & IUnionConfig & IUnionInvoice, IUser>;
    invoice: Sequelize.Model<IInstance<IInvoice>, IInvoice>;
    config: Sequelize.Model<IInstance<IConfig>, IConfig>;
    invoiceLine: Sequelize.Model<IInstance<IInvoiceLine>, IInvoiceLine>;
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
                const miguel = await db.models.user.create({ name: 'Miguel Moya Ortega', email: 'miguelmoyaortega@gmail.com', password: bcrypt.hashSync('1234', 10), root: true, dni: '48778194R' });
                const invoice0 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', nameCompany: 'Boon', received: false, date: new Date('12/12/2018') });
                const invoice1 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', nameCompany: 'Boon', date: new Date('8/8/2018') });
                const invoice2 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', nameCompany: 'Boon', date: new Date('10/10/2018') });
                const invoice3 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', nameCompany: 'Boon', received: false, date: new Date('9/9/2018') });
                const invoice4 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', nameCompany: 'Boon' });
                const invoice5 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', nameCompany: 'Boon', received: true, });
                const invoice6 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', nameCompany: 'Boon' });
                const invoice7 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', nameCompany: 'Boon', date: new Date('12/5/2018') });

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

        this.models.user.hasOne(this.models.config, { foreignKey: 'userID' });
        this.models.config.belongsTo(this.models.user, { foreignKey: 'userID' });

        this.models.invoice.hasMany(this.models.invoiceLine, { foreignKey: 'invoiceID' });
        this.models.invoiceLine.belongsTo(this.models.invoice, { foreignKey: 'invoiceID' });
    }
}

const db = new DB();
export { db };