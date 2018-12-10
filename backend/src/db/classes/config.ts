import { BaseDB } from './baseDB';
import { db } from '../db';

export class DBInvoice extends BaseDB {
    constructor() {
        super(db.models.config);
    }
}