import * as bcrypt from 'bcryptjs';
import { Config } from './models/config';
import { User } from './models/user.model';
import { File } from './models/file';
import { Invoice } from './models/invoice';
import { Sequelize } from 'sequelize-typescript';

import {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT,
    PROD
} from '../app.constants';
import { InvoiceLine } from './models/invoiceLine';


export interface IModels {
    user: typeof User;
    invoice: typeof Invoice;
    config: typeof Config;
    invoiceLine: typeof InvoiceLine;
    file: typeof File;
}

class DB {
    public sequelize: Sequelize;
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
                idle: 10000,
            },
            operatorsAliases: false,

        });
        this.createModels();
        this.init().then();
    }

    private async init() {
        await this.createDatabase();
        await this.sequelize.sync({ force: false });
        await this.createDefaultValues();
    }

    private async createDefaultValues() {
        if (!PROD) {
            let miguel: User;
            if (await db.models.user.count() === 0) {
                miguel = (await db.models.user.create({ name: 'Miguel Moya Ortega', email: 'miguelmoyaortega@gmail.com', password: bcrypt.hashSync('1234', 10), root: true, dni: '48778194R', phone: '(+34) 646 74 95 70', address: 'Calle Riu Algar, 30, 4ºE 03690 San Vicente del Raspeig (Alicante)' }))!;
                const configDB = await db.models.config.create();
                // await configDB.setUser(miguel);
            }
            if (await db.models.invoice.count() === 0) {
                miguel = (await db.models.user.findOne({ where: { email: 'miguelmoyaortega@gmail.com' } }))!;
                let invoices: Invoice[] = [];

                for (let i = 0; i < 100; i++) {
                    invoices.push(await db.models.invoice.create({ visualID: `${i}`, cif: '48771234R', fisicalAddress: 'Calle Rio Algar', received: i % 2 === 0, nameCompany: 'Boon', date: new Date(`${+ (Math.random() * 12).toFixed(0) + 1}/${+(Math.random() * 28).toFixed(0) + 1}/2019`) }));
                    let invoiceLine = await db.models.invoiceLine.bulkCreate([
                        { iva: 21, description: 'Descripción de la linea 1', price: +(Math.random() * 10000).toFixed(2), quantity: +(Math.random() * 10).toFixed(0) + 1 },
                        { iva: 21, description: 'Descripción de la linea 2', price: +(Math.random() * 10000).toFixed(2), quantity: +(Math.random() * 10).toFixed(0) + 1 },
                        { iva: 21, description: 'Descripción de la linea 3', price: +(Math.random() * 10000).toFixed(2), quantity: +(Math.random() * 10).toFixed(0) + 1 },
                    ]);
                    // await invoices[i].setInvoiceLines(invoiceLine);
                }
                // await miguel.setInvoices(invoices);
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
        // console.log(`${__dirname}/**/*.model.ts`);
        this.sequelize.addModels([`${__dirname}/**/*.model.ts`]);

        // fs.readdirSync(dirname).filter(f => f !== path.basename(module.filename)).forEach(async f => {
        //     const model = this.sequelize.import(path.join(dirname, f));
        //     this.models[model.name] = model;
        //     await this.models[model.name].sync();
        // });
        // this.models.user.hasMany(this.models.invoice, { foreignKey: 'userID' });
        // this.models.invoice.belongsTo(this.models.user, { foreignKey: 'userID' });

        // this.models.user.hasOne(this.models.config, { foreignKey: 'userID' });
        // this.models.config.belongsTo(this.models.user, { foreignKey: 'userID' });

        // this.models.invoice.hasMany(this.models.invoiceLine, { foreignKey: 'invoiceID' });
        // this.models.invoiceLine.belongsTo(this.models.invoice, { foreignKey: 'invoiceID' });

        // this.models.invoice.hasOne(this.models.file, { foreignKey: 'invoiceID' });
        // this.models.file.belongsTo(this.models.invoice, { foreignKey: 'invoiceID' });
    }
}

const db = new DB();
export { db };
