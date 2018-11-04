import { Colors } from '../tools/colors';

export function errorHandler(error, req, res, next) {
    console.error(Colors.redBright, 'ERROR: ', Colors.reset, error.error);
    res.status(error.status || 400).json({ error: error.error });
};
