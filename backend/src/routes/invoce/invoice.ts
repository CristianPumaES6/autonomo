import { DBInvoice } from '../../db/classes/invoice';
import { BaseRouter } from '../baseRouter';
import { chart } from './chart/chart';

class invoiceRouter extends BaseRouter<DBInvoice> {
    constructor() {
        super(new DBInvoice());
        this.setDefaultRoutes();
        this.init();
    }

    protected init() {
        this.route.use('/chart', chart);
    }
}

let invoice = new invoiceRouter().route;
export { invoice };