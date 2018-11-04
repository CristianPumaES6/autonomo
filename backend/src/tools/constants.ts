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
    VALUE_EMAIL_PASSWORD
} from './password';

/**
 * ESTE FICHERO ESTA COMO INTERMEDIARIO PARA SABER
 * EL NOMBRE QUE TIENEN QUE TENER LAS CONSTANTES,
 * NO PONER CONTRASEÑAS EN ESTE FICHERO.
 */
export const
    PROD = false,
    /**
     * KEYS HTTPS
     */
    ROUTE_PRIVKEY = './privkey.pem',
    ROUTE_CERT = './cert.pem',
    /**
     * DATABASE
     */
    DB_NAME = DATABASE_NAME,
    DB_USERNAME = DATABASE_USERNAME,
    DB_PASSWORD = DATABASE_PASSWORD,
    DB_HOST = DATABASE_PASSWORD,
    DB_DIALECT = 'mysql',
    /**
     * JSON WEB TOKEN
     */
    JWT_SECRET = JSONWEBTOKEN_SECRET,
    JWT_ISSUER = JSONWEBTOKEN_ISSUER,
    JWT_EXPIRES = JSONWEBTOKEN_EXPIRES,
    /**
     * PORT
     */
    PORT = 3000,
    /**
     * MASTER PASSWORD TO USERS
     */
    MASTER_PASSWORD = LOGIN_MASTER_PASSWORD,
    /**
     * EMAIL
     */
    EMAIL_HOST = VALUE_EMAIL_HOST,
    EMAIL_USER = VALUE_EMAIL_USER,
    EMAIL_PASSWORD = VALUE_EMAIL_PASSWORD,
    EMAIL_FROM = '"Isofocus" <soporte@isofocus.es>',
    EMAIL_SERVICE = 'gmail';
