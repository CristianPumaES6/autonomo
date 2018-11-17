import { Colors } from '../tools/colors';
import { PROD } from '../tools/constants';

export function errorHandler(error, req, res, next) {
    console.error(Colors.redBright, 'ERROR: ', Colors.reset, error.error);
    if (!PROD) console.log(error.trueError);
    res.status(error.status || 400).json({ error: error.error });
};
