import { Application, Router } from 'express'
import { albumService } from './album.service'

const router: Router = Router()

export const albumRoute = (app: Application) => {
    app.use('/albums', router);

    router.get('/', async (req, res) => {
        const albums = await albumService.all();
        res.json(albums)
    })

    router.get('/:albumId', async (req, res) => {
        const {albumId} = req.params
        const albums = await albumService.one(+albumId);
        res.json(albums)
    })

    router.post('/', async (req, res) => {
        const {title, cover, artistId, albumType} = req.body
        const album = await albumService.save(req.body);
        res.json(album)
    })
}
