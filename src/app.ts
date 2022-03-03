import express, { Application } from 'express'
import cors from 'cors'

import { artistRoute } from './app/artist/artist.route'
import { searchRoute } from './app/search/search.route'
import { libraryRoute } from './app/library/library.route'
import { trackRoute } from './app/track/track.route'
import { playlistRoute } from './app/playlist/playlist.route'
import { userRoute } from './app/user/user.route'
import { accountRoute } from './app/account/account.route'
import { albumRoute } from './app/album/album.route'

class App {
  public express: Application

  constructor() {
    this.express = express()
    this.middleware()
    this.initRoutes()
  }

  private initRoutes(): void {
    albumRoute(this.express)
    artistRoute(this.express)
    searchRoute(this.express)
    libraryRoute(this.express)
    trackRoute(this.express)
    playlistRoute(this.express)
    userRoute(this.express)
    accountRoute(this.express)
  }

  private middleware(): void {
    this.express.use(express.static('src/public'))
    this.express.use(cors())
    this.express.use(express.json())
  }
}

export default new App().express
