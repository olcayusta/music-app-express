
import pool from '../../config/db'
import { Playlist } from '../../models/playlist.model'
import { Album } from '../../models/album.model'
import { Artist } from '../../models/artist.model'

class LibraryService {
    async playlists(userId: number): Promise<Playlist[]> {
        // const {userId} = req.user.id
        const sql = `SELECT *
                     FROM playlists
                     WHERE "userId" = $1`
        const values = [userId]
        const { rows } = await pool.query(sql, values)
        return rows
    }

    async albums(userId: number): Promise<Album[]> {
        // const { userId } = req.user.id
        const sql = `SELECT *
                     FROM user_albums
                     WHERE "userId" = $1`
        const values = [userId]
        const { rows } = await pool.query(sql, values)
        return rows
    }

    async artists(userId: number): Promise<Artist[]> {
        // const { userId } = req.user.id
        const sql = `SELECT *
                     FROM user_artists
                     WHERE "userId" = $1`
        const { rows } = await pool.query(sql, [userId])
        return rows
    }
}

export const libraryService = new LibraryService()
