import { DBUser } from '../../db/classes/user';
import { BaseRouter } from '../baseRouter';
import { Auth } from '../../classes/auth';
import { IUser } from '../../../../global/interfaces';

class userRouter extends BaseRouter<DBUser> {
    constructor() {
        super(new DBUser());
        this.setDefaultRoutes();
        this.init();
    }

    init() {
        this.route.get('/my', async (req, res, next) => {
            const id = Auth.verify(req.headers.authorization);
            try {
                let user = await this.db.getMy(+id);
                res.json(user);
            } catch (e) {
                next({ error: 'No se ha podido encontrar el usuario' });
            }
        });

        this.route.put('/profile', async (req, res, next) => {
            const id = +Auth.verify(req.headers.authorization);
            let user: IUser = req.body;
            delete user.id;
            delete user.root;
            delete user.password;

            user.id = id;
            try {
                let userSend = await this.db.put(user);
                res.json(userSend);
            } catch (e) {
                next({ error: 'No se ha podido encontrar el usuario' });
            }
        });
    }
}

let user = new userRouter().route;
export { user };
