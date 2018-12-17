import { environment } from '../environments/environment';

export const
    PROD = environment.production,
    TOKEN_NAME = 'id_token',
    SERVER_URL = PROD ? 'https://isofocus.es:3000' : 'http://miguelmoportati:3000';
