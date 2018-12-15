import { User } from '../../db/models/user';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_ISSUER } from '../../app.constants';
import { JWT_EXPIRES } from '../../../last/src/tools/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

class Auth {
    encode(user: User) {
        return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES, issuer: JWT_ISSUER });
    }

    decode(token: string) {
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
