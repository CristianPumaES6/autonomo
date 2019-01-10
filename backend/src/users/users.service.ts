import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { db } from '../db';
import { IUser } from '../../../global/interfaces';

@Injectable()
export class UsersService {
    async get(id: number) {
        const user = (await db.models.user.findOne({ where: { id } }))!.dataValues;
        if (!user) throw new HttpException('No se ha podido obtener el usuario', HttpStatus.NOT_FOUND);
        delete user.password; delete user.deletedAt;
        return user;
    }

    async update(user: IUser) {
        delete user.root; delete user.password; delete user.email;
        return db.models.user.create(user);
    }
}
