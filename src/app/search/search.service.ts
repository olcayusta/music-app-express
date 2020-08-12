import { Artist } from '../../models/artist.model'
import pgPool from '../../config/db'

class SearchService {
    async search(searchTerm: string): Promise<Artist[]> {
        try {
            const tsQuery = `${searchTerm}:*`
            const sql = `SELECT *
                         FROM artists
                         WHERE to_tsquery($1) @@ to_tsvector("displayName")`
            const {rows} = await pgPool.query(sql, [tsQuery])
            return rows
        } catch (e) {
            throw e
        }
    }
}

export const searchService = new SearchService()
