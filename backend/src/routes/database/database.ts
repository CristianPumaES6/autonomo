import * as express from 'express';
import { DB } from '../../db';

let database = express.Router();

database.get('/refresh', async (req, res, next) => {
    try {
        await new DB().sync(true);
        await DB.init();
        res.json({ ok: true });
    } catch (e) {
        next({ type: 'error', error: 'Error creating database' });
    }
});

export { database };