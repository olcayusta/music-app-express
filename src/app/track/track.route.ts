import { Application, Router } from 'express'
import { trackService } from './track.service'

const router: Router = Router()

export const trackRoute = (app: Application) => {
  app.use('/tracks', router)

  router.get('/', async (req, res) => {
    try {
      const tracks = await trackService.all()
      res.json(tracks)
    } catch (e) {
      throw e
    }
  })

  router.get('/:id', async (req, res) => {
    try {
      const { trackId } = req.params as any
      const track = await trackService.one(+trackId)
      res.json(track)
    } catch (e) {
      throw e
    }
  })

  router.post('/', async (req, res) => {
    const { title, length, artists, albumId } = req.body
    const track = await trackService.save(title, length, artists, albumId)
    res.json(track)
  })
}
