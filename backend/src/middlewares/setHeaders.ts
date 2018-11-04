import { Router } from 'express';

const setHeaders = Router();

setHeaders.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DETELE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

export { setHeaders };