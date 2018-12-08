import { BaseDB } from './baseDB';
import { db } from '../db';
import moment = require('moment');

export class DBInvoice extends BaseDB {
    constructor() {
        super(db.models.config);
    }
}