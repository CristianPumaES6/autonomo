import { BaseRouter } from '../../baseRouter';
import { DBInvoice } from '../../../db/classes/invoice';
import { Auth } from '../../../classes/auth';

class invoiceRouter extends BaseRouter<DBInvoice> {
    constructor() {
        super(new DBInvoice());
        this.init();
    }

    protected init() {
        this.route.get('/total', async (req, res, next) => {
            const id = +Auth.verify(req.headers.authorization);
            try {
                const chart = await this.db.getChartTotal(id);
                res.json(chart);
            } catch (e) {
                next({ error: 'No se ha podido crear la gráfica', trueError: e });
            }
        });

        this.route.get('/earned', async (req, res, next) => {
            const id = +Auth.verify(req.headers.authorization);
            try {
                const chart = await this.db.getChartEarned(id);
                res.json(chart);
            } catch (e) {
                next({ error: 'No se ha podido crear la gráfica', trueError: e });
            }
        });
    }
}

let chart = new invoiceRouter().route;
export { chart };