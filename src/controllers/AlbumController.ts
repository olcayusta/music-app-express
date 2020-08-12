import {Request, Response, Router} from 'express';
import pgPool from '../config/db';
import {Album} from "../models/album.model";

class AlbumController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private init(): void {
        this.router.get('/', this.all);
        this.router.get('/:albumId', this.one);
        this.router.post('/', this.save);
    }

    private async all(req: Request, res: Response) {
        const sql = `SELECT *
                     FROM albums`;
        const {rows} = await pgPool.query(sql);
        const albums: Album[] = rows;
        res.send(albums);
    }

    private async one(req: Request, res: Response) {
        const {albumId} = req.params;
        const sql = `SELECT id, title, cover, "releaseDate", "albumType"
                     FROM albums
                     WHERE id = $1`;
        const {rows} = await pgPool.query(sql, [albumId]);
        const album: Album = rows[0];
        res.send(album);
    }

    private async save(req: Request, res: Response) {
        const {title, cover, artistId, albumType} = req.body;
        const sql = `INSERT INTO albums (title, cover, "artistId", "albumType")
                     VALUES ($1, $2, $3, $4) RETURNING *`;
        const {rows} = await pgPool.query(sql, [title, cover, artistId, albumType]);
        const album: Album = rows[0];
        res.send(album);
    }
}

export default new AlbumController();
