import { DBUser } from '../../db/classes/user';
import { BaseRouter } from '../baseRouter';

class userRouter extends BaseRouter<DBUser> {
    constructor() {
        super(new DBUser());
        this.setDefaultRoutes();
    }
}

let user = new userRouter().route;
export { user };