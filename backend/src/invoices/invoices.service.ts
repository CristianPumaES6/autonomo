import { Injectable } from '@nestjs/common';
import { db } from '../db';
import { Invoice } from '../db/models/invoice';
import * as moment from 'moment';

@Injectable()
export class InvoicesService {
    async get(user: number) {
        return await db.models.invoices.find({ where: { user } });
    }

    async getID(user: number, id: number) {
        return await db.models.invoices.findOne({ where: { user, id } });
    }

    async post(invoice: Invoice) {
        delete invoice.deletedAt; delete invoice.createdAt; delete invoice.id;
        return await db.models.invoices.insert(invoice);
    }

    async put(invoice: Invoice, user: number) {
        delete invoice.deletedAt; delete invoice.createdAt;
        return await db.models.invoices.update({ id: invoice.id, user }, invoice);
    }

    async delete(id: number, user: number) {
        return await db.models.invoices.update({ deletedAt: moment().format() }, { id, user });
    }
}
