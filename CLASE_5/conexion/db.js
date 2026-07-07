import PG from "pg";
import 'dotenv/config';

const {Pool }= PG;

export const pool = new  Pool({
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port:process.env.DB_PORT, 
    database: process.env.DB_DATABASE, 
    max:10,
    idleTimeoutMillis:30000,
    connectionTimeoutMillies:2000 
})

pool.query('select now()')
    .then(() => console.log('CONEXION EXITOSA'))
    .catch(err => console.error(' Error DE CONEXION',err.message))