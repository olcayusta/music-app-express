import { Request, Response, Router } from 'express'
import pgPool from '../config/db'
import { Artist } from "../models/artist.model"

class ArtistController {
    public router: Router

    constructor() {
        this.router = Router()
        this.init()
    }

    private init(): void {
        this.router.get('/', this.all)
        this.router.get('/:artistId', this.one)
        this.router.post('/', this.save)
    }

    private async all(req: Request, res: Response) {
        const sql = `SELECT *
                     FROM artists`
        const {rows} = await pgPool.query(sql)
        const artists: Artist[] = rows
        res.send(artists)
    }

    private async one(req: Request, res: Response) {
        const {artistId} = req.params
        try {
            const sql = `SELECT a.id,
                                a."displayName",
                                a.picture,
                                a.description,
                                x.albums
                         FROM artists a
                                  LEFT JOIN LATERAL (
                             SELECT jsonb_agg(
                                            jsonb_build_object(
                                                    'id', albums.id,
                                                    'title', albums.title,
                                                    'releaseDate', albums."releaseDate",
                                                    'cover', albums.cover,
                                                    'artists',
                                                    (
                                                        SELECT jsonb_agg(
                                                                       jsonb_build_object('id', artists.id,
                                                                                          'displayName',
                                                                                          artists."displayName")
                                                                   )
                                                        FROM artists
                                                        WHERE id IN ((SELECT aa."artistId"
                                                                      FROM album_artists aa
                                                                      WHERE aa."albumId" = albums.id))
                                                    )
                                                )
                                        ) AS albums
                             FROM albums
                                      LEFT JOIN album_artists aa on albums.id = aa."albumId"
                             WHERE aa."artistId" = $1
                             ) X ON TRUE
                         WHERE a.id = $1
            `
            const {rows, rowCount} = await pgPool.query(sql, [artistId])
            const artist: Artist = rows[0]
            if (rowCount) {
                res.send(artist)
            } else {
                res.sendStatus(404)
            }
        } catch (e) {
            throw e
        }
    }

    private async save(req: Request, res: Response) {
        const {displayName, picture, description} = req.body
        const sql = `INSERT INTO artists ("displayName", picture, description)
                     VALUES ($1, $2, $3)
                     RETURNING *`
        const {rows} = await pgPool.query(sql, [displayName, picture, description])
        const artist: Artist = rows[0]
        res.send(artist)
    }
}

export default new ArtistController()
