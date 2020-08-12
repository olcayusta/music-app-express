import { Request, Response, Router } from 'express'
import pgPool from '../config/db'
import { Track } from "../models/track.model"

class AlbumController {
    public router: Router

    constructor() {
        this.router = Router()
        this.init()
    }

    private init(): void {
        this.router.get('/', this.all)
        this.router.get('/:id', this.one)
        this.router.post('/', this.save)
    }

    private async all(req: Request, res: Response) {
        const sql = `SELECT *
                     FROM tracks`
        const {rows} = await pgPool.query(sql)
        const tracks: Track[] = rows
        res.send(tracks)
    }

    private async one(req: Request, res: Response) {
        const {userId} = req.params
        const sql = `SELECT *
                     FROM tracks
                     WHERE id = $1`
        const {rows} = await pgPool.query(sql, [userId])
        const track: Track = rows[0]
        res.send(track)
    }

    private async save(req: Request, res: Response) {
        const {title, length, artists, albumId} = req.body
        const sql = `INSERT INTO tracks (title, length, artists, "albumId")
                     VALUES ($1, $2, $3, $4) RETURNING *`
        const {rows} = await pgPool.query(sql, [title, length, artists, albumId])
        const track: Track = rows[0]
        res.send(track)
    }
}

export default new AlbumController()
