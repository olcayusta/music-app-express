import express, { Application } from 'express'
import cors from 'cors'
import UserController from './controllers/UserController'
import ArtistController from './controllers/ArtistController'
import AlbumController from './controllers/AlbumController'
import TrackController from './controllers/TrackController'
import PlaylistController from './controllers/PlaylistController'
import AccountController from './controllers/AccountController'
import LibraryController from './controllers/LibraryController'
import SearchController from './controllers/SearchController'
import { artistRoute } from './artist/artist.route'

class App {
    public express: Application

    constructor() {
        this.express = express()
        this.middleware()
        this.routes()

        artistRoute(this.express);
    }

    private middleware(): void {
        this.express.use(express.static('src/public'))
        this.express.use(cors())
        this.express.use(express.json())
    }

    private routes(): void {
        this.express.use('/users', UserController.router)
        this.express.use('/artists', ArtistController.router)
        this.express.use('/albums', AlbumController.router)
        this.express.use('/tracks', TrackController.router)
        this.express.use('/playlists', PlaylistController.router)
        this.express.use('/me', AccountController.router)
        this.express.use('/library', LibraryController.router)
        this.express.use('/search', SearchController.router)
    }
}



export default new App().express
