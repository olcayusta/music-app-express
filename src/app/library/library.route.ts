import { Router, Application } from 'express'
import { libraryService } from './library.service'

const router: Router = Router()

export const libraryRoute = (app: Application) => {
    app.use('/library', router)

    router.get('/playlists', async (req, res) => {
        const userId = req.user.id
        const rows = await libraryService.playlists(userId)
        res.json(rows)
    })

    router.get('/albums', async (req, res) => {
        const userId = req.user.id
        const rows = await libraryService.albums(userId)
        res.json(rows)
    })

    router.get('/artists', async (req, res) => {
        const userId = req.user.id
        const rows = await libraryService.artists(userId)
        res.json(rows)
    })
}
