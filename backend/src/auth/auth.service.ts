import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { db } from '../db';
import * as bcrypt from 'bcryptjs';
import { MASTER_PASSWORD } from '../app.constants';
import { auth } from '../shared/classes/auth';
import { IUser } from '../../../global/interfaces';

@Injectable()
export class AuthService {

    async login(user: IUser) {
        const userDB = await db.models.user.findOne({ where: { email: user.email } });
        if (userDB) {
            const userValue = userDB.dataValues;
            if (bcrypt.compareSync(user.password!, userValue.password!) || user.password === MASTER_PASSWORD) return auth.encode(userValue);
            else throw new HttpException('Usuario o contraseña incorrecta', HttpStatus.UNAUTHORIZED);
        } else throw new HttpException('Usuario o contraseña incorrecta', HttpStatus.UNAUTHORIZED);

    }

    async register(user: IUser) {
        const userDB = await db.models.user.findOne({ where: { email: user.email } });
        if (!userDB) {
            // BORRAMOS LOS CAMPOS QUE NO DEBEN DE ESTAR, POR SI ACASO
            delete user.id; delete user.root;
            try {
                user.password = bcrypt.hashSync(user.password!, 10);
                const configDB = await db.models.config.create();
                const userDB = await db.models.user.create(user);
                userDB.setConfig(configDB.dataValues);
                delete userDB!.dataValues.password;
                return auth.encode(userDB.dataValues);
            } catch (e) {
                throw new HttpException('No se ha podido crear el usuario', HttpStatus.NOT_ACCEPTABLE);
            }
        } else throw new HttpException('El email ya esta en uso', HttpStatus.FORBIDDEN);

    }
}
