import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { db } from '../db';

import * as fs from 'fs';
import * as pdf from 'html-pdf';
import * as path from 'path';
import { IInvoice, IInvoiceLine } from '../../../global/interfaces';

@Injectable()
export class InvoicesService {
    async get(user: number) {
        return await db.models.invoice.findAll({ where: { userID: user }, include: [db.models.invoiceLine] });
    }

    async getID(user: number, id: number) {
        return await db.models.invoice.findOne({ where: { userID: user, id }, include: [db.models.invoiceLine] });
    }

    async post(invoice: IInvoice & { invoiceLine: IInvoiceLine[] }) {
        const invoiceLine = await db.models.invoiceLine.bulkCreate(invoice.invoiceLine);
        const invoiceDB = await db.models.invoice.create(invoice);
        await invoiceDB.setInvoiceLines(invoiceLine);
        return invoiceDB;
    }

    async put(invoice: IInvoice, user: number) {
        // TODO: Mirar como hacer el update de las lineas de factura (borrassssssssr todas las de una linea y añadirle las nuevas).
        return await db.models.invoice.update(invoice, { where: { id: invoice.id!, userID: user } });
    }

    async delete(id: number, user: number) {
        return await db.models.invoice.destroy({ where: { id, userID: user } });
    }

    async restore(id: number, user: number) {
        return await db.models.invoice.restore({ where: { id, userID: user } });
    }

    async next(user: number): Promise<{ max: number }> {
        return (await db.sequelize.query({ query: 'SELECT MAX(visualID) AS max FROM invoices WHERE userID = ?', values: [user] }))[0][0];
    }

    async check(visualID: number, user: number) {
        return (await db.models.invoice.findAll({ where: { visualID, userID: user }, attributes: ['id'] })).length !== 1;
    }

    async generatePDF(id: number, user: number) {
        const invoice = await db.models.invoice.findOne({ where: { id, userID: user } });
        const userDB = await db.models.user!.findOne({ where: { id: user } });

        if (!userDB || !invoice) throw new HttpException('No puedes generar el PDF', HttpStatus.UNAUTHORIZED);

        let template = fs.readFileSync(path.join(__dirname, '../shared/templates/factura.html'), 'utf-8');
        const userValue = userDB.dataValues,
            invoiceValues = invoice.dataValues;

        template = template
            .replace(/@@nombre@@/g, userValue.name!)
            .replace(/@@direccionUser@@/g, userValue.address!)
            .replace(/@@telefono@@/g, userValue.phone!)
            .replace(/@@dni@@/g, userValue.dni!)
            .replace(/@@date@@/g, invoiceValues.date!.toLocaleDateString())
            .replace(/@@nombreCom@@/g, invoiceValues.nameCompany!)
            .replace(/@@direccion@@/g, invoiceValues.fisicalAddress!)
            .replace(/@@id@@/g, `${invoiceValues.visualID!}`)
            .replace(/@@dninie@@/g, invoiceValues.cif!)
            .replace(/@@subtotal@@/g, '------')
            .replace(/@@notas@@/g, invoiceValues.notes || '');

        return new Promise((resolve, reject) => pdf.create(template).toBuffer((err, buf) => err ? reject(err) : resolve(buf)));
    }
}
