import { BaseRouter } from '../baseRouter';
import { IUser } from '@isofocus/interfaces';
import { Auth } from '../../classes/auth';
import { DBUser } from '../../db/classes/user';
import { isLogged } from '../../middlewares/isLogged';

class AuthRouter extends BaseRouter<DBUser> {
    constructor() {
        super(new DBUser());
        this.init();
    }

    init() {
        this.route.route('/login')
            .post(async (req, res, next) => {
                let json = req.body;

                if (json.password && json.email) {
                    let userToCheck: IUser = { password: json.password, email: json.email };
                    let user = await this.db.checkLogin(userToCheck);
                    if (typeof user === 'string') next({ type: 'error', error: user });
                    else res.json({ token: Auth.encode(user.id) });
                } else next({ type: 'json', error: 'Email or user incorrect' });
            });

        this.route.route('/token').get(isLogged, (req, res) => res.json());

        this.route.route('/register')
            .post(async (req, res, next) => {
                const user = await this.db.registerUser(req.body);
                if (typeof user === 'string') next({ type: 'error', error: 'Email currently in use' });
                else res.json({ user });
            });
    }
}

const auth = new AuthRouter().route;
export { auth };