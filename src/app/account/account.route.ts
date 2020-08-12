import { Application, Router } from 'express'
import { accountService } from './account.service'

const router: Router = Router()

export const accountRoute = (app: Application) => {
    app.use('/me', router)

    router.get('/', async (req, res) => {
        const user = await accountService.account()
        res.json(user)
    })

    router.get('/playlists', async (req, res) => {
        const playlists = await accountService.playlists()
        res.json(playlists)
    })

    router.get('/albums', async (req, res) => {
        const albums = await accountService.albums()
        res.json(albums)
    })

    router.get('/artists', async (req, res) => {
        const artists = await accountService.artists()
        res.json(artists)
    })
}
