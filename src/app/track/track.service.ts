import { Track } from '../../models/track.model'
import pool from '../../config/db'

class TrackService {
    async all(): Promise<Track[]> {
        const sql = `SELECT *
                     FROM tracks`
        const {rows} = await pool.query(sql)
        return rows
    }

    async one(trackId: number): Promise<Track> {
        const sql = `SELECT *
                     FROM tracks
                     WHERE id = $1`
        const values = [trackId]
        const {rows} = await pool.query(sql, values)
        return rows[0]
    }

    async save(...args: any): Promise<Track> {
        const {title, length, artists, albumId} = args
        const sql = `INSERT INTO tracks (title, length, artists, "albumId")
                     VALUES ($1, $2, $3, $4)
                     RETURNING *`
        const values = [title, length, artists, albumId]
        const {rows} = await pool.query(sql, values)
        return rows[0]
    }
}

export const trackService = new TrackService()
