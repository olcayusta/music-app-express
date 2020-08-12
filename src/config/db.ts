import { Pool } from 'pg'

import dotenv from 'dotenv'
dotenv.config()

const pgPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
    max: 5
})

export default pgPool
