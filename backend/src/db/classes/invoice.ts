import { BaseDB } from './baseDB';
import { db } from '../db';
import { IInvoice, IUser } from '../../../../global/interfaces';
import moment from 'moment';

export class DBInvoice extends BaseDB {
    constructor() {
        super(db.models.invoice);
    }

    public async getMy(id: IInvoice['id']);
    public async getMy(id: IInvoice['id'], idInvoice: IInvoice['id']);
    public async getMy(id: IInvoice['id'], idInvoice?: IInvoice['id']) {
        return idInvoice === undefined ? this.db.findAll({
            where: {
                userID: id,
            },
            order: [
                ['date', 'DESC'],
            ]
        }) : this.db.findOne({
            where: {
                userID: id,
                id: idInvoice,
            }
        });
    }

    public async getNextID(idUser: IUser['id']) {
        return await (this.db.max('visualID', {
            where: {
                userID: idUser,
            }
        })) || 0;
    }

    public async checkId(id: IInvoice['visualID'], idUser: IUser['id']) {
        const invoice = await this.db.findOne({
            where: {
                visualID: id,
                userID: idUser,
            },
        });
        return invoice === null;
    }

    public async getChartTotal(id: number) {
        let chart = await db.sequelize.query({
            query: `
                SELECT COUNT(*) total, MONTH(date) as day
                FROM invoices 
                    WHERE userID = ? AND
                    ${this.checkDeleted()}
                GROUP BY MONTH(date);
            `, values: [id]
        });
        return this.setMonth(chart);
    }

    public async getChartEarned(id: number) {
        let chart = await db.sequelize.query({
            query: `
                SELECT sum(price) total, MONTH(date) as day
                FROM invoices 
                WHERE userID = ? AND 
                    received = false AND
                    ${this.checkDeleted()}
                GROUP BY MONTH(date);
            `, values: [id]
        });
        return this.setMonth(chart);
    }

    public async getChartWasted(id: number) {
        let chart = await db.sequelize.query({
            query: `
                SELECT sum(price) total, MONTH(date) as day
                FROM invoices 
                WHERE userID = ? AND
                    received = true AND
                    ${this.checkDeleted()}
                GROUP BY MONTH(date);
            `, values: [id]
        });
        return this.setMonth(chart);
    }

    public async getChartIvaEarn(id: number) {
        let chart = await db.sequelize.query({
            query: `
                SELECT sum((iva * price) / 100) total, MONTH(date) as day
                FROM invoices 
                WHERE userID = ? AND
                    received = true AND
                    ${this.checkDeleted()}
                GROUP BY MONTH(date);
            `, values: [id]
        });
        return this.setMonth(chart);
    }

    private setMonth(chart: any) {
        chart = chart[0];
        let toReturn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 12; i++)
            for (const index in chart)
                if (chart[index].day === i)
                    toReturn[i - 1] = +chart[index].total;

        return toReturn;
    }

    private checkDeleted() {
        return `(invoices.deletedAt > '${moment().format('YYYY/MM/DD HH:mm:ss')}' OR invoices.deletedAt IS NULL)`;
    }
}