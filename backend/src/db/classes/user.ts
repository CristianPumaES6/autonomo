import * as bcrypt from 'bcrypt';
import { BaseDB } from './baseDB';
import { IUser } from '@isofocus/interfaces';
import { MASTER_PASSWORD } from '../../tools/constants';
import { db } from '../db';

export class DBUser extends BaseDB {
    constructor() {
        super(db.models.user);
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

    public async checkEmail(email: IUser['email']) {
        return await this.db.findOne({ where: { email } });
    }

    public async registerUser(user: IUser) {
        let exists = await this.checkEmail(user.email);
        if (exists) return 'Email currently in use.';
        else {
            let config = await db.models.config.create();
            user.password = bcrypt.hashSync(user.password, 10);
            let userCreated: any = await this.db.create(user, { returning: true });
            await userCreated.setConfigs(config);
            return userCreated;
        }
    }

    public async get();
    public async get(id?: IUser['id']);
    public async get(id?: IUser['id']) {
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

    public async getMy(id: IUser['id']) {
        const user = await this.db.findOne({ where: { id }, include: [db.models.config] });
        delete user.dataValues.password;
        return user;
    }
}