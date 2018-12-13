import { DBUser } from '../../db/classes/user';
import { BaseRouter } from '../baseRouter';
import { Auth } from '../../classes/auth';
import { IUser } from '../../../../global/interfaces';

class userRouter extends BaseRouter<DBUser> {
    constructor() {
        super(new DBUser());
        this.init();
    }

    init() {
        this.route.get('/my', async (req, res, next) => {
            const id = Auth.verify(req.headers.authorization);
            try {
                res.json(await this.db.getMy(+id));
            } catch (e) {
                next({ error: 'No se ha podido encontrar el usuario', trueError: e });
            }
        });

        this.route.put('/profile', async (req, res, next) => {
            const id = +Auth.verify(req.headers.authorization);
            let user: IUser = req.body;
            delete user.id;
            delete user.root;
            delete user.password;
            delete (<any>user).deletedAt;
            delete (<any>user).updatedAt;
            delete (<any>user).createdAt;
            delete user.email;

            user.id = id;
            try {
                res.json(await this.db.put(user));
            } catch (e) {
                next({ error: 'No se ha podido encontrar el usuario', trueError: e });
            }
        });
    }
}

let user = new userRouter().route;
export { user };
