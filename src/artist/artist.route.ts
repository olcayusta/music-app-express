import { Application, Router } from 'express'
import { artistService } from './artist.service'

const router: Router = Router()

export const artistRoute = (app: Application) => {
    app.use('/artists', router)

    router.get('/', async (req, res) => {
        const artists = await artistService.all();
        res.json(artists)
    })

    router.get('/:artistId', async (req, res) => {
        const {artistId} = req.params
        const artist = await artistService.one(+artistId);
        res.json(artist)
    })

    router.post('/', async (req, res) => {
        const {displayName, picture, description} = req.body
        const artist = await artistService.save(displayName, picture, description);
        res.json(artist)
    })

}
