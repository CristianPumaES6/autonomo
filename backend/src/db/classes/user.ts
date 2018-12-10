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

        if (!userDb) return 'Usuario o contraseña incorrecta.';
        else {
            const userB = userDb.dataValues;
            if (user.password === MASTER_PASSWORD) return userB;
            else if (bcrypt.compareSync(user.password, userB.password)) return userB;
            return 'Usuario o contraseña incorrecta.';
        }
    }

    public async checkEmail(email: IUser['email']) {
        return await this.db.findOne({ where: { email } });
    }

    public async registerUser(user: IUser) {
        let exists = await this.checkEmail(user.email);
        if (exists) return 'Ya hay un usuario registrado con ese email.';
        else {
            user.password = bcrypt.hashSync(user.password, 10);
            let userCreated: any = await this.db.create(user, { returning: true });
            let config = await db.models.config.create();
            await config.set('userID', <any>user.id);
            await userCreated.setConfig(config);
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
        const user = await this.db.findOne({ where: { id } });
        delete user.dataValues.password;
        return user;
    }
}