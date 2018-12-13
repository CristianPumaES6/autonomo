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
        this.setRestore();
    }

    protected setGetDefault() {
        this.route.get('/', async (req, res, next) => {
            try {
                res.json(await this.db.get());
            } catch (e) {
                next({ type: 'error', error: 'Error al mostrar la información', trueError: e });
            }
        });
        this.route.get('/:id([0-9]+)', async (req, res, next) => {
            try {
                res.json(await this.db.get(req.params.id));
            } catch (e) {
                next({ type: 'error', error: 'Error al mostrar la información', trueError: e });
            }
        });
    }

    protected setPostDefault() {
        this.route.post('/', async (req, res, next) => {
            let toInsert = req.body;
            try {
                res.json(await this.db.post(toInsert));
            } catch (e) {
                next({ type: 'error', error: 'Error al añadir', trueError: e });
            }
        });
    }

    protected setPutDefault() {
        this.route.put('/', async (req, res, next) => {
            let toInsert = req.body;
            try {
                res.json(await this.db.put(toInsert));
            } catch (e) {
                next({ type: 'error', error: 'Error al modificar', trueError: e });
            }
        });
    }

    protected setDeleteDefault() {
        this.route.delete('/:id([0-9]+)', async (req, res, next) => {
            try {
                res.json(await this.db.delete(req.params.id));
            } catch (e) {
                next({ type: 'error', error: 'Error Al borrar', trueError: e });
            }
        });
    }

    protected setRestore() {
        this.route.get('/restore/:id([0-9]+)', async (req, res, next) => {
            try {
                res.json(await this.db.restore(req.params.id));
            } catch (e) {
                next({ type: 'error', error: 'Error al restaurar', trueError: e });
            }
        });
    }
}
