import { DBInvoice } from '../../db/classes/invoice';
import { BaseRouter } from '../baseRouter';
import { chart } from './chart/chart';
import { Auth } from '../../classes/auth';

class invoiceRouter extends BaseRouter<DBInvoice> {
    constructor() {
        super(new DBInvoice());
        this.setDeleteDefault();
        this.setPutDefault();
        this.setRestore();
        this.init();
    }

    protected init() {
        this.route.use('/chart', chart);

        this.route.get('/', async (req, res, next) => {
            const id = Auth.verify(req.headers.authorization);
            try {
                res.json(await this.db.getMy(+id));
            } catch (e) {
                next({ type: 'error', error: 'Error getting data', trueError: e });
            }
        });

        this.route.get('/:id([0-9]+)', async (req, res, next) => {
            const id = Auth.verify(req.headers.authorization);
            try {
                res.json(await this.db.getMy(+id, req.params.id));
            } catch (e) {
                next({ type: 'error', error: 'Error getting data', trueError: e });
            }
        });

        this.route.get('/next', async (req, res, next) => {
            const id = Auth.verify(req.headers.authorization);
            try {
                res.json((await this.db.getNextID(+id)) + 1);
            } catch (e) {
                next({ type: 'error', error: 'Error getting data', trueError: e });
            }
        });

        this.route.get('/check/:id([0-9]+)', async (req, res, next) => {
            const id = Auth.verify(req.headers.authorization),
                visualID = req.params.id;
            try {
                res.json({ ok: await this.db.checkId(visualID, +id) });
            } catch (e) {
                next({ type: 'error', error: 'Error getting data', trueError: e });
            }
        });


        this.route.post('/', async (req, res, next) => {
            const id = Auth.verify(req.headers.authorization);
            let body = req.body;

            body.userID = id;
            try {
                res.json(await this.db.post(body));
            } catch (e) {
                next({ type: 'error', error: 'Error getting data', trueError: e });
            }
        });
    }
}

let invoice = new invoiceRouter().route;
export { invoice };