import { Album } from './album.model'

export interface Artist {
    id: number
    displayName: string
    picture: string
    description: string
    albums: Album[]
}
