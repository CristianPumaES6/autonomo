import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../tools/constants';

export class Auth {
    public static encode(toEncode: any) {
        return jwt.sign({ id: toEncode }, JWT_SECRET);
    }

    public static verify(token: string): number | false {
        try {
            token = token.replace('Bearer ', '');
            return +(jwt.verify(token, JWT_SECRET, { ignoreExpiration: false }) as any).id;
        } catch (e) {
            return false;
        }
    }
}
