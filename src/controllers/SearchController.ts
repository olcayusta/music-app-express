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

    }
}

export default new SearchController()
