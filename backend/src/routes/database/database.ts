import * as express from 'express';
import { db } from '../../db/db';

let database = express.Router();

database.get('/refresh', async (req, res, next) => {
    try {
        let a = await db.sync(true);
        res.json({ ok: a });
    } catch (e) {
        next({ type: 'error', error: 'Error creating database' });
    }
});

export { database };