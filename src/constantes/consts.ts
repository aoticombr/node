require('dotenv').config();

export const cpfcnpjregexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const cpfregexp     = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
export const cnpjregexp    = /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/;
export const cepregexp     = /^\d{5}-\d{3}/;
export const emailregexp   = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const DB_PG = {
  host     : process.env.db_host,
  user     : process.env.db_user,
  password : process.env.db_password,
  database : process.env.db_database,
  port     : process.env.db_port,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 1000,
  max: 999999,
  allowExitOnIdle: true
}



export const SECRET = String(process.env.secretkey);
export const TOKEN_LIMIT = '7d';


