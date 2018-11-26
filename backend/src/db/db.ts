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

import { IUser, IInvoice } from '@isofocus/interfaces';
import { IInstance } from './models/instance';

export interface IModels {
    user: Sequelize.Model<IInstance<IUser> & { setInvoices(invoices: any[]), getInvoices() }, IUser>;
    invoice: Sequelize.Model<IInstance<IInvoice>, IInvoice>;
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

    public async init() {
        await this.createDatabase();
        await this.sequelize.sync();
        await this.createDefaultValues();
    }

    /**
     * PUBLIC
     */
    public async sync(force = false) {
        await this.sequelize.sync({ force });
    }


    /**
     * PRIVATE
     */
    private async createDefaultValues() {
        if (!PROD) {
            await db.models.user.count();
            if (await db.models.user.count() === 0) {
                const miguel = await db.models.user.create({ name: 'Miguel Moya Ortega', email: 'miguelmoyaortega@gmail.com', nick: 'miguelmo', password: bcrypt.hashSync('1234', 10), root: true, dni: '48778194R' });
                const invoice0 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', nameCompany: 'Boon', iva: 0, price: 1936 });
                const invoice1 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 0, price: 1936, nameCompany: 'Boon' });
                const invoice2 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 0, price: 1936, nameCompany: 'Boon' });
                const invoice3 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 0, price: 1936, nameCompany: 'Boon' });
                const invoice4 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 0, price: 1936, nameCompany: 'Boon' });
                await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 0, price: 1936, nameCompany: 'Boon' });
                const invoice6 = await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 0, price: 1936, nameCompany: 'Boon' });
                await db.models.invoice.create({ cif: '48778194R', fisicalAddress: 'calle Rio Algar 30, 4ºE', iva: 0, price: 1936, nameCompany: 'Boon' });

                await miguel.setInvoices([invoice1, invoice0, invoice2, invoice3, invoice4, invoice6]);
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

    private async createModels() {
        const dirname = `${__dirname}/models`;

        fs.readdirSync(dirname).filter(f => f !== path.basename(module.filename)).forEach(f => {
            const model = this.sequelize.import(path.join(dirname, f));
            this.models[model.name] = model;
        });

        this.models.user.hasMany(this.models.invoice, { foreignKey: 'userID' });
        this.models.invoice.belongsTo(this.models.user, { foreignKey: 'userID' });
    }
}
const db = new DB();
export { db };