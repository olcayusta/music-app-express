import pool from '../../config/db'
import { Playlist } from '../../models/playlist.model'

class PlaylistService {
    async all(): Promise<Playlist[]> {
        const sql = `SELECT *
                     FROM playlists`
        const {rows} = await pool.query(sql)
        return rows
    }

    async one(playlistId: number): Promise<Playlist> {
        const sql = `SELECT p.id, p.title, jsonb_agg(pt) AS tracks
                     FROM playlists p
                              INNER JOIN playlist_tracks pt ON pt."playlistId" = p.id
                     WHERE p.id = $1
                     GROUP BY 1`
        const {rows} = await pool.query(sql, [playlistId])
        return rows[0]
    }

    async save(...args: any): Promise<Playlist> {
        const {title, description, picture, userId} = args
        const sql = `INSERT INTO playlists (title, description, picture, "userId")
                     VALUES ($1, $2, $3, $4)
                     RETURNING *`
        const values = [title, description, picture, userId]
        const {rows} = await pool.query(sql, values)
        return rows[0]
    }
}

export const playlistService = new PlaylistService()
