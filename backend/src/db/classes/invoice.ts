import { BaseDB } from './baseDB';
import { DB } from '../db';

export class DBInvoice extends BaseDB {
    constructor() {
        super(new DB().models.invoice);
    }
}