import pgPool from '../../config/db'
import { Artist } from '../../models/artist.model'

class ArtistService {
    async all(): Promise<Artist[]> {
        try {
            const sql = `SELECT *
                         FROM artists`
            const {rows} = await pgPool.query(sql)
            return rows
        } catch (e) {
            throw e
        }
    }

    async one(artistId: number): Promise<Artist> {
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
            const {rows} = await pgPool.query(sql, [artistId])
            return rows[0]
        } catch (e) {
            throw e
        }
    }

    async save(displayName: string, picture: string, description: string): Promise<Artist> {
        try {
            const sql = `INSERT INTO artists ("displayName", picture, description)
                         VALUES ($1, $2, $3)
                         RETURNING *`
            const values = [displayName, picture, description]
            const {rows} = await pgPool.query(sql, values)
            return rows[0]
        } catch (e) {
            throw e
        }

    }
}

export const artistService = new ArtistService()
