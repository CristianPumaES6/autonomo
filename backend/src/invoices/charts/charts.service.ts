import { Injectable } from '@nestjs/common';
import { db } from '../../db';
import * as moment from 'moment';

type IChart = [{ day: string, total: string }[]];

@Injectable()
export class ChartsService {
    async getTotal(id: number, year = moment().year()) {
        const chart: IChart = await db.sequelize.query({
            query: `
                SELECT COUNT(*) total, MONTH(date) as day
                FROM invoices as I
                    WHERE I.userID = ? AND
                    YEAR(date) = ? AND
                    ${this.checkDeleted(false)}
                GROUP BY MONTH(date);
            `, values: [id, year]
        });
        return this.setMonth(chart[0]);
    }

    async geEarned(id: number, year = moment().year()) {
        const chart: IChart = await db.sequelize.query({
            query: `
            SELECT SUM(IL.price * IL.quantity) total, MONTH(I.date) as day
            FROM invoices AS I, invoiceLines AS IL
            WHERE I.userID = ? AND
            IL.invoiceID = I.id AND
            I.received = FALSE AND
            YEAR(date) = ? AND
            ${this.checkDeleted()}
            GROUP BY MONTH(date);
            `, values: [id, year],
        });
        return this.setMonth(chart[0]);
    }

    async getWasted(id: number, year = moment().year()) {
        const chart: IChart = await db.sequelize.query({
            query: `
            SELECT sum(IL.price * IL.quantity) total, MONTH(date) as day
            FROM invoices AS I, invoiceLines AS IL
            WHERE I.userID = ? AND
                IL.invoiceID = I.id AND
                received = true AND
                YEAR(date) = ? AND
                ${this.checkDeleted()}
            GROUP BY MONTH(date);
        `, values: [id, year],
        });
        return this.setMonth(chart[0]);
    }

    async getIvaEarn(id: number, year = moment().year()) {
        const chart: IChart = await db.sequelize.query({
            query: `
            SELECT sum((IL.iva * IL.price * IL.quantity) / 100) total, MONTH(date) as day
            FROM invoices AS I, invoiceLines AS IL
            WHERE I.userID = ? AND
                IL.invoiceID = I.id AND
                received = true AND
                YEAR(date) = ? AND
                ${this.checkDeleted()}
            GROUP BY MONTH(date);
        `, values: [id, year],
        });
        return this.setMonth(chart[0]);
    }

    private setMonth(chart: IChart[0]) {
        const toReturn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 13; i++) {
            for (const index in chart) {
                if (+chart[index].day === i) {
                    toReturn[i - 1] = +chart[index].total;
                }
            }
        }
        return toReturn;
    }

    private checkDeleted(withInvoiceLine = true) {
        return `(I.deletedAt > '${moment().format('YYYY/MM/DD HH:mm:ss')}' OR I.deletedAt IS NULL)${withInvoiceLine ? ` AND (IL.deletedAt > '${moment().format('YYYY/MM/DD HH:mm:ss')}' OR IL.deletedAt IS NULL)` : ''}`;
    }
}
