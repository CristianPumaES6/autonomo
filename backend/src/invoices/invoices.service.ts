import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { db } from '../db';
import { Invoice } from '../db/models/invoice';

import * as fs from 'fs';
import * as moment from 'moment';
import * as pdf from 'html-pdf';
import * as path from 'path';

@Injectable()
export class InvoicesService {
    async get(user: number) {
        return await db.models.invoices!.find({ where: { user } });
    }

    async getID(user: number, id: number) {
        return await db.models.invoices!.findOne({ where: { user, id } });
    }

    async post(invoice: Invoice) {
        delete invoice.deletedAt; delete invoice.createdAt; delete invoice.id;
        return await db.models.invoices!.insert(invoice);
    }

    async put(invoice: Invoice, user: number) {
        delete invoice.deletedAt; delete invoice.createdAt;
        return await db.models.invoices!.update({ id: invoice.id, user }, invoice);
    }

    async delete(id: number, user: number) {
        return await db.models.invoices!.update({ id, user }, { deletedAt: moment().format() });
    }

    async restore(id: number, user: number) {
        return await db.models.invoices!.update({ id, user }, { deletedAt: null });
    }

    async next(user: number) {
        return await db.models.invoices!.createQueryBuilder()
            .select('MAX(visualID) as max')
            .where('userID = :user')
            .setParameters({ user })
            .getRawOne();
    }

    async check(visualID: number, user: number) {
        return (await db.models.invoices!.find({ where: { visualID, user }, select: ['id'] })).length !== 1;
    }

    async generatePDF(id: number, user: number) {
        const invoice = await db.models.invoices!.findOne({ where: { id, user } });
        const userDB = await db.models.users!.findOne({ where: { id: user } });

        if (!userDB || !invoice) {
            throw new HttpException('No puedes generar el PDF', HttpStatus.UNAUTHORIZED);
        }

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
            .replace(/@@descripcion@@/g, invoice.description || '')
            .replace(/@@total@@/g, (+invoice.price!).toFixed(2) + '€')
            .replace(/@@subtotal@@/g, '------')
            .replace(/@@iva@@/g, invoice.iva!.toString())
            .replace(/@@ivaTotal@@/g, ((+invoice.iva! / 100) * +invoice.price!).toFixed(2) + '€')
            .replace(/@@notas@@/g, invoice.notes || '')
            .replace(/@@totalFactura@@/g, (+invoice.price! + (+invoice.price! * ((+invoice.iva! / 100)))).toFixed(2) + '€');

        return new Promise((resolve, reject) => pdf.create(template).toBuffer((err, buf) => err ? reject(err) : resolve(buf)));
    }
}
