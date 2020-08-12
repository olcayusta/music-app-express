import { Artist } from './artist.model'
import { Track } from './track.model'

export interface Album {
    id: number
    title: string
    length: number
    artist: Artist
    tracks: Track[]
}
