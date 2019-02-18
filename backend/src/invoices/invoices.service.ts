import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { db } from '../db';

import * as fs from 'fs';
import * as pdf from 'html-pdf';
import * as path from 'path';
import { IInvoice, IInvoiceLine } from '../../../global/interfaces';
import * as moment from 'moment';
import { saveImage } from 'src/shared/classes/file';

@Injectable()
export class InvoicesService {
    async get(user: number) {
        return await db.models.invoice.findAll({ where: { userID: user }, order: ['date'] });
    }

    async getID(user: number, id: number) {
        return await db.models.invoice.findOne({ where: { userID: user, id }, include: [db.models.invoiceLine, db.models.file], order: ['date'] });
    }

    async post(invoice: IInvoice & { invoiceLines: IInvoiceLine[] }) {
        const invoiceLine = await db.models.invoiceLine.bulkCreate(invoice.invoiceLines);
        const invoiceDB = await db.models.invoice.create(invoice);
        await invoiceDB.setInvoiceLines(invoiceLine);
        if (invoice.file) {
            const file = await saveImage(invoice.file[0] as any);
            await (file as any).setInvoice(invoiceDB);
        }
        return invoiceDB;
    }

    async put(invoice: IInvoice & { invoiceLines: IInvoiceLine[] }, user: number) {
        await db.models.invoiceLine.destroy({ where: { invoiceID: invoice.id! } });
        const invoiceLine = await db.models.invoiceLine.bulkCreate(invoice.invoiceLines);
        const invoiceDBSelect = await db.models.invoice.findOne({ where: { id: invoice.id!, userID: user } });
        const invoiceDB = await db.models.invoice.update(invoice, { where: { id: invoice.id!, userID: user } });
        await invoiceDBSelect!.setInvoiceLines(invoiceLine);
        if (invoice.file) {
            const file = await saveImage(invoice.file[0] as any);
            await (file as any).setInvoice(invoiceDB);
        }
        return invoiceDB;
    }

    async delete(id: number, user: number) {
        return await db.models.invoice.destroy({ where: { id, userID: user } });
    }

    async restore(id: number, user: number) {
        return await db.models.invoice.restore({ where: { id, userID: user } });
    }

    async next(user: number) {
        return (await db.models.invoice.max('visualID', { where: { userID: user, received: false } }));
    }

    async check(visualID: number, user: number) {
        return (await db.models.invoice.findAll({ where: { visualID, userID: user, received: false }, attributes: ['id'] })).length !== 1;
    }

    async generatePDF(id: number, user: number) {
        const invoice = await db.models.invoice.findOne({ where: { id, userID: user }, include: [db.models.invoiceLine] });
        const userDB = await db.models.user!.findOne({ where: { id: user } });

        if (!userDB || !invoice) throw new HttpException('No puedes generar el PDF', HttpStatus.UNAUTHORIZED);

        let template = fs.readFileSync(path.join(__dirname, '../shared/templates/factura.html'), 'utf-8');
        const userValue = userDB.dataValues,
            invoiceValues = invoice.dataValues;
        let linesWrite = '';

        let totalFactura = 0, ivaTotal = 0, subtotal = 0;
        invoiceValues.invoiceLines!.forEach((e, i) => {
            subtotal += e.price! * e.quantity!;
            ivaTotal += e.price! * e.iva! / 100 * e.quantity!;
            totalFactura += e.quantity! * e.price! + (e.price! * e.iva! / 100);
            linesWrite += `
            <div class="line ${i % 2 === 0 ? '' : 'odd'}">
                <div class="description">${e.description}</div>
                <div class="quantity">${e.quantity}</div>
                <div class="total-unitario">${e.price!.toFixed(2)} €</div>
                <div class="iva-line"> ${e.iva}% (${(e.price! * e.iva! / 100 * e.quantity!).toFixed(2)} €) </div>
                <div class="line-total">${(e.quantity! * e.price!).toFixed(2)} €</div>
            </div>`;
        });

        template = template
            .replace(/@@nombre@@/g, userValue.name!)
            .replace(/@@direccionUser@@/g, userValue.address!)
            .replace(/@@telefono@@/g, userValue.phone!)
            .replace(/@@dni@@/g, userValue.dni!)
            .replace(/@@date@@/g, moment(invoiceValues.date!).format('DD/MM/YYYY'))
            .replace(/@@nombreCom@@/g, invoiceValues.nameCompany!)
            .replace(/@@direccion@@/g, invoiceValues.fisicalAddress!)
            .replace(/@@id@@/g, `${invoiceValues.visualID!}`)
            .replace(/@@dninie@@/g, invoiceValues.cif!)
            .replace(/@@subtotal@@/g, `${subtotal.toFixed(2)} €`)
            .replace(/@@notas@@/g, invoiceValues.notes || '')
            .replace(/@@ivaTotal@@/g, `${ivaTotal.toFixed(2)} €`)
            .replace(/@@totalFactura@@/g, `${totalFactura.toFixed(2)} €`)
            .replace(/@@subtotal@@/g, `${subtotal.toFixed(2)} €`)
            .replace(/@@lines@@/g, linesWrite);

        return new Promise((resolve, reject) => pdf.create(template).toBuffer((err, buf) => err ? reject(err) : resolve(buf)));
    }
}
