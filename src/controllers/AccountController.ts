import { Request, Response, Router } from 'express'
import pgPool from '../config/db'
import { Album } from "../models/album.model"
import { Artist } from "../models/artist.model"
import { Playlist } from "../models/playlist.model"
import { User } from "../models/user.model"

class AccountController {
    public router: Router

    constructor() {
        this.router = Router()
        this.init()
    }

    private init(): void {
        this.router.get('/', this.account)
        this.router.get('/playlists', this.playlists)
        this.router.get('/albums', this.albums)
        this.router.get('/artists', this.artists)
    }

    private async account(req: Request, res: Response) {
        const sql = `SELECT * FROM users WHERE id = $1`
        const { rows } = await pgPool.query(sql, [1])
        const user: User = rows[0]
        res.send(user)
    }

    private async playlists(req: Request, res: Response) {
        // const {userId} = req.user.id
        const sql = `SELECT *
                     FROM playlists
                     WHERE "userId" = $1`
        const { rows } = await pgPool.query(sql, [1])
        const playlists: Playlist[] = rows
        console.log(playlists)
        res.send(playlists)
    }

    private async albums(req: Request, res: Response) {
        const { userId } = req.user.id
        const sql = `SELECT *
                     FROM user_albums
                     WHERE "userId" = $1`
        const { rows } = await pgPool.query(sql, [userId])
        const albums: Album[] = rows
        res.send(albums)
    }

    private async artists(req: Request, res: Response) {
        const { userId } = req.user.id
        const sql = `SELECT *
                     FROM user_artists
                     WHERE "userId" = $1`
        const { rows } = await pgPool.query(sql, [userId])
        const artists: Artist[] = rows
        res.send(artists)
    }
}

export default new AccountController()
