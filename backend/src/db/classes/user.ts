import * as bcrypt from 'bcrypt';
import { BaseDB } from './baseDB';
import { DB } from '../db';
import { IUser } from '@isofocus/interfaces';
import { MASTER_PASSWORD } from '../../tools/constants';

export class DBUser extends BaseDB {
    constructor() {
        super(new DB().models.user);
    }

    public async checkLogin(user: IUser) {
        const userDb = await this.checkEmail(user.email);

        if (!userDb) return 'Email or password incorrect.';
        else {
            const userB = userDb.dataValues;
            if (user.password === MASTER_PASSWORD) return userB;
            else if (bcrypt.compareSync(user.password, userB.password)) return userB;
            return 'Email or password incorrect.';
        }
    }

    public async checkEmail(email: string) {
        return await this.db.findOne({ where: { email } });
    }

    public async registerUser(user: IUser) {
        let exists = await this.checkEmail(user.email);
        if (exists) return 'Email currently in use.';
        else {
            user.password = bcrypt.hashSync(user.password, 10);
            return await this.db.create(user, { returning: true });
        }
    }

    public async get();
    public async get(id?: number | string);
    public async get(id?: number | string) {
        if (!id) {
            return await this.db.findAll().map(e => {
                delete e.dataValues.password;
                return e;
            });
        } else {
            const user = await this.db.findOne({ where: { id } });
            delete user.dataValues.password;
            return user;
        }
    }
}