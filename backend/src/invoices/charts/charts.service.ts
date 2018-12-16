import { Injectable } from '@nestjs/common';
import { db } from '../../db';
import * as moment from 'moment';

@Injectable()
export class ChartsService {
    async getTotal(id: number) {
        const chart = await db.models.invoices
            .createQueryBuilder('invoice')
            .select('COUNT(*)', 'total')
            .addSelect('MONTH(date)', 'day')
            .where('userID = :id')
            .andWhere(this.checkDeleted())
            .groupBy('MONTH(date)')
            .setParameters({ id })
            .getRawMany();

        return this.setMonth(chart);
    }

    async geEarned(id: number) {
        const chart = await db.models.invoices
            .createQueryBuilder('invoice')
            .select('SUM(price)', 'total')
            .addSelect('MONTH(date)', 'day')
            .where('userID = :id')
            .andWhere('received = false')
            .andWhere(this.checkDeleted())
            .groupBy('MONTH(date)')
            .setParameters({ id })
            .getRawMany();

        return this.setMonth(chart);
    }

    async getWasted(id: number) {
        const chart = await db.models.invoices
            .createQueryBuilder('invoice')
            .select('SUM(price)', 'total')
            .addSelect('MONTH(date)', 'day')
            .where('userID = :id')
            .andWhere('received = true')
            .andWhere(this.checkDeleted())
            .groupBy('MONTH(date)')
            .setParameters({ id })
            .getRawMany();

        return this.setMonth(chart);
    }

    async getIvaEarn(id: number) {
        const chart = await db.models.invoices
            .createQueryBuilder('invoice')
            .select('SUM(iva * price) / 100', 'total')
            .addSelect('MONTH(date)', 'day')
            .where('userID = :id')
            .andWhere('received = true')
            .andWhere(this.checkDeleted())
            .groupBy('MONTH(date)')
            .setParameters({ id })
            .getRawMany();

        return this.setMonth(chart);
    }

    private setMonth(chart: any) {
        const toReturn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 12; i++) {
            // tslint:disable-next-line:forin
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
