import { Application, Router } from 'express'
import { searchService } from './search.service'

const router: Router = Router()

export const searchRoute = (app: Application) => {
    app.use('/artists', router)

    router.get('/:searchTerm', async (req, res) => {
        const {searchTerm} = req.params
        const artists = await searchService.search(searchTerm)
        res.json(artists)
    })
}
