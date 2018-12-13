import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './models';

declare let models: string[];

createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'test',
    entities: [
        User,
    ],
    synchronize: true,
    logging: false,
}).then(async connection => {
    console.log(connection);
}).catch(error => error);

export { models };
