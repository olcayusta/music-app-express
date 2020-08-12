import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'

dotenv.config()

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization: string = req.headers.authorization!
        const token = authorization.substring(authorization.lastIndexOf(' ')).trim()
        const decoded = jwt.verify(token, process.env.SECRET_KEY!)
        console.log(decoded)
        // @ts-ignore
        req.user.id = decoded.sub
        next()
    } catch (err) {
        res.send({err})
    }
}
