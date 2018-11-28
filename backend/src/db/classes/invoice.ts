import { BaseDB } from './baseDB';
import { db } from '../db';

export class DBInvoice extends BaseDB {
    constructor() {
        super(db.models.invoice);
    }

    public async getChartTotal(id: number) {
        let chart = await db.sequelize.query({
            query: `
                SELECT COUNT(*) total, MONTH(date) as day
                FROM invoices 
                WHERE userID = ?
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
                WHERE userID = ? AND received = false
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
                WHERE userID = ? AND received = true
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
                WHERE userID = ? AND received = true
                GROUP BY MONTH(date);
            `, values: [id]
        });
        return this.setMonth(chart);
    }

    private setMonth(chart: any) {
        chart = chart[0];
        let toReturn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 12; i++) {
            for (const index in chart) if (chart[index].day === i) toReturn[i - 1] = +chart[index].total;
        }
        return toReturn;
    }
}