import pool from '../../config/db'
import { User } from '../../models/user.model'
import jwt from 'jsonwebtoken'

class UserService {
    async all(): Promise<User[]> {
        const sql = `SELECT *
                     FROM users`
        const {rows} = await pool.query(sql)
        return rows
    }

    async one(userId: number): Promise<User> {
        const sql = `SELECT *
                     FROM users
                     WHERE id = $1`
        const {rows} = await pool.query(sql, [userId])
        return rows[0]
    }

    async save(...args: any): Promise<User> {
        const {email, password, displayName, picture} = args
        const sql = `INSERT INTO users (email, password, "displayName", picture)
                     VALUES ($1, $2, $3, $4)
                     RETURNING *`
        const values = [email, password, displayName, picture]
        const {rows} = await pool.query(sql, values)
        return rows[0]
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const sql = `SELECT email, "displayName", picture
                         FROM users
                         WHERE email = $1
                           AND password = $2`
            const values = [email, password]
            const {rows} = await pool.query(sql, values)
            const user: User = rows[0]
  /*          if (rowCount) {
                const token = jwt.sign({foo: 'bar', user}, process.env.SECRET_KEY!)
                // res.send({user, token})
                return {user, token}
            } else {
                res.send({err: 'not found user!'})
            }*/

            const token = jwt.sign({foo: 'bar', user}, process.env.SECRET_KEY!)
            return {user, token}
        } catch (e) {
            throw e
        }
    }
}

export const userService = new UserService()
