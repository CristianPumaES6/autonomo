import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../tools/constants';

export class Auth {
    public static encode(toEncode: any) {
        return jwt.sign(toEncode, JWT_SECRET)
    }

    public static verify(token: string) {
        try {
            return jwt.verify(token, JWT_SECRET, { ignoreExpiration: false });
        } catch (e) {
            return false;
        }
    }
}
