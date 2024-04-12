import mysql from 'mysql';
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    connectionLimit: 10 // Adjust as needed
});

export default pool;