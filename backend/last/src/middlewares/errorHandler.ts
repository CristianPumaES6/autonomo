import { Colors } from '../tools/colors';
import { PROD } from '../tools/constants';

export function errorHandler(error, req, res, next) {
    if (!PROD) {
        console.error(Colors.redBright, 'ERROR: ', Colors.reset, error.error);
        console.log(error.trueError);
    }
    res.status(error.status || 400).json({ error: error.error });
}
