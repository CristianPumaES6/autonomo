import * as jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_ISSUER } from '../tools/constants';

export class Auth {
    public static encode(toEncode: any) {
        return jwt.sign(toEncode, JWT_SECRET, { issuer: JWT_ISSUER, })
    }

    public static verify(token: string) {
        try {
            return jwt.verify(token, JWT_SECRET, { issuer: JWT_ISSUER, ignoreExpiration: false });
        } catch (e) {
            return false;
        }
    }
}
