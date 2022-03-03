import { Album } from '../../models/album.model'
import pool from '../../config/db'

class AlbumService {
  async all(): Promise<Album[]> {
    const sql = `SELECT *
                 FROM albums`
    const { rows } = await pool.query(sql)
    return rows
  }

  async one(albumId: number): Promise<Album> {
    const sql = `SELECT id, title, cover, "releaseDate", "albumType"
                 FROM albums
                 WHERE id = $1`
    const { rows } = await pool.query(sql, [albumId])
    return rows[0]
  }

  async save(...args: any): Promise<Album> {
    const { title, cover, artistId, albumType } = args
    const sql = `INSERT INTO albums (title, cover, "artistId", "albumType")
                 VALUES ($1, $2, $3, $4)
                 RETURNING *`
    const values = [title, cover, artistId, albumType]
    const { rows } = await pool.query(sql, values)
    return rows[0]
  }
}

export const albumService = new AlbumService()
