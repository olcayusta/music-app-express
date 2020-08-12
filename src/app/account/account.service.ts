import pool from '../../config/db'
import { User } from '../../models/user.model'
import { Playlist } from '../../models/playlist.model'
import { Album } from '../../models/album.model'
import { Artist } from '../../models/artist.model'

let userId = 1

class AccountService {
    async account(): Promise<User> {
        const sql = `SELECT *
                     FROM users
                     WHERE id = $1`
        const {rows} = await pool.query(sql, [1])
        return rows[0]
    }

    async playlists(userId: number = 1): Promise<Playlist[]> {
        const sql = `SELECT *
                     FROM playlists
                     WHERE "userId" = $1`
        const {rows} = await pool.query(sql, [userId])
        return rows
    }

    async albums(): Promise<Album[]> {
        // const {userId} = req.user.id
        const sql = `SELECT *
                     FROM user_albums
                     WHERE "userId" = $1`
        const {rows} = await pool.query(sql, [userId])
        return rows
    }

    async artists(): Promise<Artist[]> {
        // const {userId} = req.user.id
        const sql = `SELECT *
                     FROM user_artists
                     WHERE "userId" = $1`
        const {rows} = await pool.query(sql, [userId])
        return rows
    }
}

export const accountService = new AccountService()
