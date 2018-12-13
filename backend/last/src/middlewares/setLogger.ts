import * as express from 'express';
import * as moment from 'moment';
import { PROD } from '../tools/constants';
import { Colors } from '../tools/colors';

const setLogger = express.Router();

setLogger.use((req, res, next) => {
    if (!PROD) console.log(moment().format('HH:mm:ss') + ' [' + Colors.redBright + req.method + Colors.reset + ']: ' + Colors.greenBright + req.path);
    next();
});

export { setLogger };