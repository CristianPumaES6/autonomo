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

import { IUser, IInvoice, IConfig, IInvoiceLine, IFile } from '../../../global/interfaces';
import { IInstance, IUnionInvoices, IUnionInvoiceLine, IUnionUser, IUnionInvoice } from './instance';

export interface IModels {
    user: Sequelize.Model<IInstance<IUser> & IUnionInvoices, IUser>;
    invoice: Sequelize.Model<IInstance<IInvoice> & IUnionInvoiceLine, IInvoice>;
    config: Sequelize.Model<IInstance<IConfig> & IUnionUser, IConfig>;
    invoiceLine: Sequelize.Model<IInstance<IInvoiceLine>, IInvoiceLine>;
    file: Sequelize.Model<IInstance<IFile> & IUnionInvoice, IFile>;
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
        /**
         * IF PROD, INSERT ALL DEFAULT VALUES
         */
        if (!PROD) {
            let miguel: IInstance<IUser> & IUnionInvoice, invoices: (IInvoice & IUnionInvoiceLine[]) = [];
            if (await db.models.user.count() === 0) {
                miguel = (await db.models.user.create({ name: 'Miguel Moya Ortega', email: 'miguelmoyaortega@gmail.com', password: bcrypt.hashSync('1234', 10), root: true, dni: '48778194R' }))!;
                const configDB = await db.models.config.create();
                await configDB.setUser(miguel);
            }
            if (await db.models.invoice.count() === 0) {
                miguel = (await db.models.user.findOne({ where: { email: 'miguelmoyaortega@gmail.com' } }))!;// FIND USER TO INSERT THE INVOICES

                invoices.push(await db.models.invoice.create({ visualID: '2019000001', cif: '48771234R', fisicalAddress: 'Calle Rio Algar', nameCompany: 'Boon', date: new Date('12/12/2019') }));
                let invoiceLine = await db.models.invoiceLine.bulkCreate([
                    { iva: 21, description: 'Descripción de la linea 1', price: 35, quantity: 2 },
                    { iva: 21, description: 'Descripción de la linea 2', price: 145, quantity: 6 },
                    { iva: 21, description: 'Descripción de la linea 3', price: 5, quantity: 20 },
                ]);
                await invoices[0].setInvoiceLines(invoiceLine);

                invoices.push(await db.models.invoice.create({ visualID: '2019000002', cif: '48771234R', fisicalAddress: 'Calle Rio Algar', nameCompany: 'Boon', date: new Date('3/3/2019') }));
                invoiceLine = await db.models.invoiceLine.bulkCreate([
                    { iva: 21, description: 'Descripción de la linea 4', price: 335, quantity: 2 },
                    { iva: 21, description: 'Descripción de la linea 5', price: 15, quantity: 6 },
                    { iva: 21, description: 'Descripción de la linea 6', price: 59, quantity: 80 },
                ]);
                await invoices[1].setInvoiceLines(invoiceLine);

                await miguel.setInvoices(invoices);

                invoices.push(await db.models.invoice.create({ visualID: '2019000003', cif: '48771234R', fisicalAddress: 'Calle Rio Algar', received: false, nameCompany: 'Boon', date: new Date('5/5/2019') }));
                invoiceLine = await db.models.invoiceLine.bulkCreate([
                    { iva: 21, description: 'Descripción de la linea 7', price: 335, quantity: 2 },
                    { iva: 21, description: 'Descripción de la linea 8', price: 15, quantity: 6 },
                    { iva: 21, description: 'Descripción de la linea 9', price: 59, quantity: 280 },
                ]);
                await invoices[2].setInvoiceLines(invoiceLine);

                await miguel.setInvoices(invoices);

                invoices.push(await db.models.invoice.create({ visualID: '2019000004', cif: '48771234R', fisicalAddress: 'Calle Rio Algar', received: false, nameCompany: 'Boon', date: new Date('11/11/2019') }));
                invoiceLine = await db.models.invoiceLine.bulkCreate([
                    { iva: 21, description: 'Descripción de la linea 10', price: 5, quantity: 9 },
                    { iva: 21, description: 'Descripción de la linea 11', price: 105, quantity: 6 },
                    { iva: 21, description: 'Descripción de la linea 12', price: 599, quantity: 10 },
                ]);
                await invoices[3].setInvoiceLines(invoiceLine);

                await miguel.setInvoices(invoices);
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

        this.models.invoice.hasOne(this.models.file, { foreignKey: 'fileID' });
        this.models.file.belongsTo(this.models.invoice, { foreignKey: 'fileID' });
    }
}

const db = new DB();
export { db };
