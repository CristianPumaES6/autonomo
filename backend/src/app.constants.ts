import {
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    JSONWEBTOKEN_SECRET,
    JSONWEBTOKEN_ISSUER,
    JSONWEBTOKEN_EXPIRES,
    LOGIN_MASTER_PASSWORD,
    VALUE_EMAIL_HOST,
    VALUE_EMAIL_USER,
    VALUE_EMAIL_PASSWORD,
    DATABASE_PROD_NAME,
    DATABASE_PROD_USERNAME,
    DATABASE_PROD_PASSWORD,
    DATABASE_PROD_HOST,
} from './shared/password';

/**
 * ESTE FICHERO ESTA COMO INTERMEDIARIO PARA SABER
 * EL NOMBRE QUE TIENEN QUE TENER LAS CONSTANTES.
 * NO PONER CONTRASEÑAS EN ESTE FICHERO.
 */
export const PROD = false;
/**
 * KEYS HTTPS
 */
export const ROUTE_PRIVKEY = '/etc/letsencrypt/live/isofocus.es-0001/privkey.pem';
export const ROUTE_CERT = '/etc/letsencrypt/live/isofocus.es-0001/cert.pem';
/**
 * DATABASE
 */
export const DB_NAME = PROD ? DATABASE_PROD_NAME : DATABASE_NAME;
export const DB_USERNAME = PROD ? DATABASE_PROD_USERNAME : DATABASE_USERNAME;
export const DB_PASSWORD = PROD ? DATABASE_PROD_PASSWORD : DATABASE_PASSWORD;
export const DB_HOST = PROD ? DATABASE_PROD_HOST : DATABASE_PASSWORD;
export const DB_DIALECT = 'mysql';
export const DB_PORT = 3306;
/**
 * JSON WEB TOKEN
 */
export const JWT_SECRET = JSONWEBTOKEN_SECRET;
export const JWT_ISSUER = JSONWEBTOKEN_ISSUER;
export const JWT_EXPIRES = JSONWEBTOKEN_EXPIRES;
/**
 * PORT
 */
export const PORT = 3000;
/**
 * MASTER PASSWORD TO USERS
 */
export const MASTER_PASSWORD = LOGIN_MASTER_PASSWORD;
/**
 * EMAIL
 */
export const EMAIL_HOST = VALUE_EMAIL_HOST;
export const EMAIL_USER = VALUE_EMAIL_USER;
export const EMAIL_PASSWORD = VALUE_EMAIL_PASSWORD;
export const EMAIL_FROM = '"Isofocus" <soporte@isofocus.es>';
export const EMAIL_SERVICE = 'gmail';
/**
 * SIZE
 */
export const MAX_SIZE_FILE = 2048;
