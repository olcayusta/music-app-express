import { Request, Response, Router } from 'express'
import pgPool from '../config/db'
import { User } from '../models/user.model'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

class UserController {
    public router: Router

    constructor() {
        this.router = Router()
        this.init()
    }

    private init(): void {
        this.router.get('/', this.all)
        this.router.get('/:id', this.one)
        this.router.post('/', this.save)
        this.router.post('/login', this.login)
    }

    private async all(req: Request, res: Response) {
        const sql = `SELECT *
                     FROM users`
        const {rows} = await pgPool.query(sql)
        const users: User[] = rows
        res.send(users)
    }

    private async one(req: Request, res: Response) {
        const {userId} = req.params
        const sql = `SELECT *
                     FROM users
                     WHERE id = $1`
        const {rows} = await pgPool.query(sql, [userId])
        const user: User = rows[0]
        res.send(user)
    }

    private async save(req: Request, res: Response) {
        const {email, password, displayName, picture} = req.body
        const sql = `INSERT INTO users (email, password, "displayName", picture)
                     VALUES ($1, $2, $3, $4) RETURNING *`
        const {rows} = await pgPool.query(sql, [email, password, displayName, picture])
        const user: User = rows[0]
        res.send(user)
    }

    private async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body
            const sql = `SELECT email, "displayName", picture FROM users WHERE email = $1 AND password = $2`
            const {rows, rowCount} = await pgPool.query(sql, [email, password])
            const user: User = rows[0]

            if (rowCount) {
                const token = jwt.sign({foo: 'bar', user}, process.env.SECRET_KEY!)
                res.send({user, token})
            } else {
                res.send({err: 'not found user!'})
            }
        } catch (e) {
            throw e
        }
    }

}

export default new UserController()
