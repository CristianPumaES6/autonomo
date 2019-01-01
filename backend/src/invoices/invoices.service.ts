import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { db } from '../db';

import * as fs from 'fs';
import * as pdf from 'html-pdf';
import * as path from 'path';
import { IInvoice, IInvoiceLine } from '../../../global/interfaces';

@Injectable()
export class InvoicesService {
    async get(user: number) {
        return await db.models.invoice.findAll({ where: { user }, include: [db.models.invoiceLine] });
    }

    async getID(user: number, id: number) {
        return await db.models.invoice.findOne({ where: { user, id }, include: [db.models.invoiceLine] });
    }

    async post(invoice: IInvoice & { invoiceLine: IInvoiceLine[] }, userID: number) {
        delete invoice.id;
        const invoiceLine = invoice.invoiceLine;
        (<any>invoice).userID = userID;
        const invoiceDB = await db.models.invoice.create(invoice);
        invoiceDB.setInvoices(invoiceLine);
        return invoiceDB;
    }

    async put(invoice: IInvoice, user: number) {
        return await db.models.invoice.update(invoice, { where: { id: invoice.id!, user } });
    }

    async delete(id: number, user: number) {
        return await db.models.invoice.destroy({ where: { id, user } });
    }

    async restore(id: number, user: number) {
        return await db.models.invoice.restore({ where: { id, user } });
    }

    async next(user: number) {
        return await db.sequelize.query({ query: 'SELECT MAX(visualID) AS max from invoices WHERE userID = ?', values: [user] });
    }

    async check(visualID: number, user: number) {
        return (await db.models.invoice.find({ where: { visualID, user }, attributes: ['id'] })).length !== 1;
    }

    async generatePDF(id: number, user: number) {
        const invoice = await db.models.invoice.findOne({ where: { id, user } });
        const userDB = await db.models.user!.findOne({ where: { id: user } });

        if (!userDB || !invoice) throw new HttpException('No puedes generar el PDF', HttpStatus.UNAUTHORIZED);

        let template = fs.readFileSync(path.join(__dirname, '../shared/templates/factura.html'), 'utf-8');
        template = template
            .replace(/@@nombre@@/g, userDB.name!)
            .replace(/@@direccionUser@@/g, userDB.address!)
            .replace(/@@telefono@@/g, userDB.phone!)
            .replace(/@@dni@@/g, userDB.dni!)
            .replace(/@@date@@/g, invoice.date!.toLocaleDateString())
            .replace(/@@nombreCom@@/g, invoice.nameCompany!)
            .replace(/@@direccion@@/g, invoice.fisicalAddress!)
            .replace(/@@id@@/g, invoice.visualID!)
            .replace(/@@dninie@@/g, invoice.cif!)
            .replace(/@@subtotal@@/g, '------')
            .replace(/@@notas@@/g, invoice.notes || '');

        return new Promise((resolve, reject) => pdf.create(template).toBuffer((err, buf) => err ? reject(err) : resolve(buf)));
    }
}
