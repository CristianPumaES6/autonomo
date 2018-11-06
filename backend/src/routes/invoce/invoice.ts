import { DBInvoice } from '../../db/classes/invoice';
import { BaseRouter } from '../baseRouter';

class invoiceRouter extends BaseRouter<DBInvoice> {
    constructor() {
        super(new DBInvoice());
        this.setDefaultRoutes();
    }
}

let invoice = new invoiceRouter().route;
export { invoice };