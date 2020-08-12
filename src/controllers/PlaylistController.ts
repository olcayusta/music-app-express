import { Request, Response, Router } from 'express'
import pgPool from '../config/db'
import { Playlist } from "../models/playlist.model"

class PlaylistController {
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
                     FROM playlists`
        const {rows} = await pgPool.query(sql)
        const playlists: Playlist[] = rows
        res.send(playlists)
    }

    private async one(req: Request, res: Response) {
        const {playlistId} = req.params
        const sql = `SELECT p.id, p.title, jsonb_agg(pt) AS tracks
                     FROM playlists p
                              INNER JOIN playlist_tracks pt ON pt."playlistId" = p.id
                     WHERE p.id = $1
                     GROUP BY 1`
        const {rows} = await pgPool.query(sql, [playlistId])
        const playlist: Playlist = rows[0]
        res.send(playlist)
    }

    private async save(req: Request, res: Response) {
        const {title, description, picture, userId} = req.body
        const sql = `INSERT INTO playlists (title, description, picture, "userId")
                     VALUES ($1, $2, $3, $4)
                     RETURNING *`
        const {rows} = await pgPool.query(sql, [title, description, picture, userId])
        const playlist: Playlist = rows[0]
        res.send(playlist)
    }
}

export default new PlaylistController()
