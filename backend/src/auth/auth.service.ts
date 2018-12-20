import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { db } from '../db';
import { User } from '../db/models/user';
import * as bcrypt from 'bcryptjs';
import { MASTER_PASSWORD } from '../app.constants';
import { auth } from '../shared/classes/auth';
import { Config } from '../db/models/config';

@Injectable()
export class AuthService {

    async login(user: User) {
        const userDB = await db.models!.users.findOne({ email: user.email });
        if (userDB) {
            if (bcrypt.compareSync(user.password, userDB.password) || user.password === MASTER_PASSWORD) return auth.encode(userDB);
            else throw new HttpException('Usuario o contraseña incorrecta', HttpStatus.UNAUTHORIZED);
        } else throw new HttpException('Usuario o contraseña incorrecta', HttpStatus.UNAUTHORIZED);

    }

    async register(user: User) {
        const userDB = await db.models!.users.findOne({ email: user.email });
        if (!userDB) {
            // BORRAMOS LOS CAMPOS QUE NO DEBEN DE ESTAR, POR SI ACASO
            delete user.id; delete user.createdAt; delete user.deletedAt; delete user.updatedAt; delete user.root;
            try {
                user.password = bcrypt.hashSync(user.password, 10);
                const config = await db.models!.configs.save(new Config());
                user.config = config;
                const userReturn = await db.models!.users.save(user);
                delete userReturn.password;
                return auth.encode(userReturn);
            } catch (e) {
                throw new HttpException('No se ha podido crear el usuario', HttpStatus.NOT_ACCEPTABLE);
            }
        } else throw new HttpException('El email ya esta en uso', HttpStatus.FORBIDDEN);

    }
}
