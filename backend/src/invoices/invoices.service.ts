import { Injectable } from '@nestjs/common';
import { db } from '../db';
import { Invoice } from '../db/models/invoice';

@Injectable()
export class InvoicesService {
    async get(userID: number) {
        return await db.models.invoices.find({ where: { userID } });
    }

    async getID(userID: number, id: number) {
        return await db.models.invoices.findOne({ where: { userID, id } });
    }

    async post(invoice: Invoice) {
        delete invoice.deletedAt; delete invoice.createdAt; delete invoice.id;
        return await db.models.invoices.insert(invoice);
    }

    async put(invoice: Invoice, user: number) {
        delete invoice.deletedAt; delete invoice.createdAt;
        return await db.models.invoices.update({ id: invoice.id, user }, invoice);
    }
}
