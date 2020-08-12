import { Application, Router } from 'express'
import { playlistService } from './playlist.service'

const router: Router = Router()

export const playlistRoute = (app: Application) => {
    app.use('/playlists', router)

    router.get('/', async (req, res) => {
        const playlists = await playlistService.all()
        res.json(playlists)
    })

    router.get('/:playlistId', async (req, res) => {
        const {playlistId} = req.params
        const playlist = await playlistService.one(+playlistId)
        res.json(playlist)
    })

    router.post('/', async (req, res) => {
        const {title, description, picture, userId} = req.body
        const playlist = await playlistService.save(req.body)
        res.json(playlist)
    })
}
