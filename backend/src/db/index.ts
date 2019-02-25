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
        await this.sequelize.sync({ force: false });
        await this.createDefaultValues();
    }

    /**
     * PRIVATE
     */
    private async createDefaultValues() {
        if (!PROD) {
            let miguel: IInstance<IUser> & IUnionInvoices, invoices: (IInvoice & IUnionInvoiceLine[]) = [];
            if (await db.models.user.count() === 0) {
                miguel = (await db.models.user.create({ name: 'Miguel Moya Ortega', email: 'miguelmoyaortega@gmail.com', password: bcrypt.hashSync('1234', 10), root: true, dni: '48778194R', phone: '(+34) 646 74 95 70', address: 'Calle Riu Algar, 30, 4ºE 03690 San Vicente del Raspeig (Alicante)' }))!;
                const configDB = await db.models.config.create();
                await configDB.setUser(miguel);
            }
            if (await db.models.invoice.count() === 0) {
                miguel = (await db.models.user.findOne({ where: { email: 'miguelmoyaortega@gmail.com' } }))!;

                for (let i = 0; i < 100; i++) {
                    invoices.push(await db.models.invoice.create({ visualID: `${i}`, cif: '48771234R', fisicalAddress: 'Calle Rio Algar', received: i % 2 === 0, nameCompany: 'Boon', date: new Date(`${+ (Math.random() * 12).toFixed(0) + 1}/${+(Math.random() * 28).toFixed(0) + 1}/2019`) }));
                    let invoiceLine = await db.models.invoiceLine.bulkCreate([
                        { iva: 21, description: 'Descripción de la linea 1', price: +(Math.random() * 10000).toFixed(2), quantity: +(Math.random() * 10).toFixed(0) + 1 },
                        { iva: 21, description: 'Descripción de la linea 2', price: +(Math.random() * 10000).toFixed(2), quantity: +(Math.random() * 10).toFixed(0) + 1 },
                        { iva: 21, description: 'Descripción de la linea 3', price: +(Math.random() * 10000).toFixed(2), quantity: +(Math.random() * 10).toFixed(0) + 1 },
                    ]);
                    await invoices[i].setInvoiceLines(invoiceLine);
                }
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

        this.models.invoice.hasOne(this.models.file, { foreignKey: 'invoiceID' });
        this.models.file.belongsTo(this.models.invoice, { foreignKey: 'invoiceID' });
    }
}

const db = new DB();
export { db };
