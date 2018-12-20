import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { db } from '../db';
import { User } from '../db/models/user';

@Injectable()
export class UsersService {
    async get(id: number) {
        const user = await db.models.users!.findOne({ where: { id, deletedAt: 'null' } });

        if (!user) throw new HttpException('No se ha podido obtener el usuario', HttpStatus.NOT_FOUND);

        delete user.password; delete user.deletedAt;

        return user;
    }

    async update(user: User) {
        delete user.root; delete user.password; delete user.deletedAt;
        delete user.updatedAt; delete user.createdAt; delete user.email;
        return db.models.users!.save(user);
    }
}
