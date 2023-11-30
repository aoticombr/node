"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_LIMIT = exports.SECRET = exports.DB_PG = exports.emailregexp = exports.cepregexp = exports.cnpjregexp = exports.cpfregexp = exports.cpfcnpjregexp = void 0;
require('dotenv').config();
exports.cpfcnpjregexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.cpfregexp = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
exports.cnpjregexp = /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/;
exports.cepregexp = /^\d{5}-\d{3}/;
exports.emailregexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.DB_PG = {
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
    port: process.env.db_port,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 1000,
    max: 999999,
    allowExitOnIdle: true
};
exports.SECRET = String(process.env.secretkey);
exports.TOKEN_LIMIT = '7d';
