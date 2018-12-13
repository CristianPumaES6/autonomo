import { BaseRouter } from '../baseRouter';
import { Auth } from '../../classes/auth';
import { DBConfig } from '../../db/classes/config';

class ConfigRoute extends BaseRouter<DBConfig> {
    constructor() {
        super(new DBConfig());
        this.init();
    }

    init() {
        this.route.get('/', async (req, res, next) => {
            const id = Auth.verify(req.headers.authorization);

            try {
                res.json(await this.db.getFromUser(id));
            } catch (e) {
                next({ error: 'No se ha podido encontrar la configuración', trueError: e });
            }
        });

        this.route.put('/', async (req, res, next) => {
            const id = +Auth.verify(req.headers.authorization),
                config = req.body;

            try {
                res.json(await this.db.putConfig(config, id));
            } catch (e) {
                next({ error: 'No se ha podido actualizar la configuración', trueError: e });
            }
        });
    }
}

let config = new ConfigRoute().route;
export { config };
