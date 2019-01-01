import { Injectable } from '@nestjs/common';
import { db } from '../../db';
import * as moment from 'moment';

type IChart = { day: string, total: string }[];

@Injectable()
export class ChartsService {
    async getTotal(id: number) {
        const chart: IChart = await db.sequelize.query({
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

    async geEarned(id: number) {
        const chart: IChart = await db.sequelize.query({
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

    async getWasted(id: number) {
        const chart: IChart = await db.sequelize.query({
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

    async getIvaEarn(id: number) {
        const chart: IChart = await db.sequelize.query({
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

    private setMonth(chart: IChart) {
        const toReturn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 12; i++) {
            for (const index in chart) {
                if (+chart[index].day === i) {
                    toReturn[i - 1] = +chart[index].total;
                }
            }
        }
        return toReturn;
    }

    private checkDeleted() {
        return `(deletedAt > '${moment().format('YYYY/MM/DD HH:mm:ss')}' OR deletedAt IS NULL)`;
    }
}
