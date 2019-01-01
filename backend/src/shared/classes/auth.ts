import * as jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_ISSUER, JWT_EXPIRES } from '../../app.constants';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IUser } from '../../../../global/interfaces';

class Auth {
    encode(user: IUser) {
        return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES, issuer: JWT_ISSUER });
    }

    decode(token: string): number {
        try {
            token = token.replace('Bearer ', '');
            return (jwt.verify(token, JWT_SECRET, { issuer: JWT_ISSUER }) as any).id;
        } catch (e) {
            throw new HttpException('Su token ha expirado', HttpStatus.UNAUTHORIZED);
        }
    }
}

const auth = new Auth();

export { auth };
