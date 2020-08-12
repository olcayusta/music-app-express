import { Application, Router } from 'express'
import { userService } from './user.service'

const router: Router = Router()

export const userRoute = (app: Application) => {
    app.use('/users', router)

    router.get('/', async (req, res) => {
        const users = await userService.all()
        res.json(users)
    })

    router.get('/:userId', async (req, res) => {
        const {userId} = req.params
        const user = await userService.one(+userId)
        res.json(user)
    })

    router.post('/', async (req, res) => {
        const {email, password, displayName, picture} = req.body
        const user = await userService.save(req.body)
        res.json(user)
    })

    router.post('/login', async (req, res) => {
        const {email, password} = req.body
        const user = await userService.login(email, password)
        res.json(user)
    })

}
