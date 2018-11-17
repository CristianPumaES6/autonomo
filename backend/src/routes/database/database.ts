import * as express from 'express';
import { DB } from '../../db/db';

let database = express.Router();

database.get('/refresh', async (req, res, next) => {
    try {
        let a = await new DB().sync(true);
        console.log('entra');
        console.log(a);
        // await DB.init();
        res.json({ ok: true });
    } catch (e) {
        next({ type: 'error', error: 'Error creating database' });
    }
});

export { database };