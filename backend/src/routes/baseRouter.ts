import * as express from 'express';
import { BaseDB } from 'src/db/classes/baseDB';

export class BaseRouter<T> {
    public route = express.Router();
    protected db: T & BaseDB;

    constructor(db: T & BaseDB) {
        this.db = db;
    }

    protected setDefaultRoutes() {
        this.setGetDefault();
        this.setPostDefault();
        this.setPutDefault();
        this.setDeleteDefault();
    }

    protected setGetDefault() {
        this.route.get('/', async (req, res, next) => {
            try {
                res.json({ user: await this.db.get() });
            } catch (e) {
                next({ type: 'error', error: 'Error getting data' });
            }
        });
        this.route.get('/:id([0-9]+)', async (req, res, next) => {
            try {
                res.json({ user: await this.db.get(req.params.id) });
            } catch (e) {
                next({ type: 'error', error: 'Error getting data' });
            }
        });
    }

    protected setPostDefault() {
        this.route.post('/', async (req, res, next) => {
            let toInsert = req.body;
            try {
                res.json({ user: await this.db.post(toInsert) });
            } catch (e) {
                next({ type: 'error', error: 'Error adding data' });
            }
        });
    }

    protected setPutDefault() {
        this.route.put('/', async (req, res, next) => {
            let toInsert = req.body;
            try {
                res.json({ user: await this.db.put(toInsert) });
            } catch (e) {
                next({ type: 'error', error: 'Error editing data' });
            }
        });
    }

    protected setDeleteDefault() {
        this.route.delete('/:id([0-9]+)', async (req, res, next) => {
            try {
                res.json({ user: await this.db.delete(req.params.id) });
            } catch (e) {
                next({ type: 'error', error: 'Error deleting data' });
            }
        });
    }

    /**
     * IMPLEMENT THE ROUTE HERE
     */
    protected init() { }
}
