import { Injectable } from '@nestjs/common';
import { db } from '../db';

@Injectable()
export class UsersService {

    async getAll() {
        return await db.models.users.find({ where: { deletedAt: null } });
    }

    async get(id: number) {
        return await db.models.users.findOne({ where: { id, deletedAt: null } });
    }
}
