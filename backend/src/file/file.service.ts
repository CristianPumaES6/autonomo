import { Injectable } from '@nestjs/common';
import { db } from '../db';

@Injectable()
export class FileService {
    async checkOwner(path: string, userID: number) {
        await db.models.file.count({ include: [{ model: db.models.invoice, where: { userID } }], where: { path } }) !== 1;
    }
}
