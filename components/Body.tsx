import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Poster from './Poster'
import Search from './Search'

export interface Track {
  id?: string
  artist?: string
  title?: string
  uri?: string
  albumUrl?: string
  popularity?: number
}
interface Props {
  spotifyApi: SpotifyWebApi
  chooseTrack: (track: Track) => void
}
const Body = ({ spotifyApi,chooseTrack }: Props) => {
  const { data: session } = useSession()
  const { accessToken } = session!
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<Track[]>()
  const [newReleases, setNewReleases] = useState<Track[]>()

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  /* Searching... */
  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    spotifyApi
      .searchTracks(search, {
        limit: 10,
      })
      .then((data) =>
        setSearchResults(
          data.body.tracks?.items.map((track) => ({
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          }))
        )
      )
  }, [accessToken, search])
  // console.log(searchResults, "searchResults");

  /* New Releases... */
  useEffect(() => {
    if (!accessToken) return

    spotifyApi
      .getNewReleases( {
        limit: 10,
      })
      .then((data) =>
        setNewReleases(
          data.body.albums?.items.map((track) => ({
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          }))
        )
      )
  }, [accessToken])
  // console.log(newReleases, "newReleases");

  return (
    <section className="ml-24 flex-grow space-y-8 bg-black py-4 md:mr-2.5 md:max-w-6xl">
      <Search search={search} setSearch={setSearch} />

      <div className="grid h-96 grid-cols-2 gap-x-4 gap-y-8 overflow-y-scroll p-4 py-4 scrollbar-hide lg:grid-cols-3 xl:grid-cols-4">
        {searchResults?.length === 0
          ? newReleases
              ?.slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))
          : searchResults
              ?.slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))}
      </div>
    </section>
  )
}
export default Body
