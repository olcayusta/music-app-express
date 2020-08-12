import { Request, Response, Router } from 'express'
import pgPool from '../config/db'
import { User } from '../models/user.model'
import dotenv from 'dotenv'

dotenv.config()

class SearchController {
    public router: Router

    constructor() {
        this.router = Router()
        this.init()
    }

    private init(): void {
        this.router.get('/:searchTerm', this.index)
    }

    private async index(req: Request, res: Response) {
        const {searchTerm} = req.params
        const tsQuery = `${searchTerm}:*`
        const sql = `SELECT *
                     FROM artists
                     WHERE to_tsquery($1) @@ to_tsvector("displayName")`
        const {rows} = await pgPool.query(sql, [tsQuery])
        const users: User[] = rows
        res.send(users)
    }
}

export default new SearchController()
