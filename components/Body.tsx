import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Poster from './Poster'
import Search from './Search'
import Track from './Track'

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
const Body = ({ spotifyApi, chooseTrack }: Props) => {
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
      .getNewReleases({
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

      <div className="absolute ml-6 flex min-w-full gap-x-8 md:relative">
        {/* Genres */}
        <div className="hidden max-w-[270px] xl:inline">
          <h2 className="mb-3 font-bold text-white">Genres</h2>
          <div className="mb-3 flex flex-wrap gap-x-2 gap-y-2.5">
            <div className="genre">Classic</div>
            <div className="genre">House</div>
            <div className="genre">Minimal</div>
            <div className="genre">Hip-hop</div>
            <div className="genre">Electronic</div>
            <div className="genre">Chillout</div>
            <div className="genre">Blues</div>
            <div className="genre">Country</div>
            <div className="genre">Techno</div>
          </div>
          <button className="w-full rounded-2xl bg-[#1A1A1A] bg-opacity-80 py-3.5 px-4 text-[13px] font-bold text-[#CECECE] transition ease-out hover:bg-opacity-100">
            All Genres
          </button>
        </div>

        {/* Tracks */}
        <div className="">
          <h2 className="mb-3 font-bold text-white">
            {searchResults?.length === 0 ? 'New Releases' : 'Tracks'}
          </h2>

          <div className="scrollbar-thumb-rounded h-[1000px] w-[830px] space-y-3 overflow-y-scroll rounded-2xl border-2 border-[#262626] bg-[#0D0D0D] p-3 scrollbar-thin scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 md:h-96">
            {searchResults?.length === 0
              ? newReleases
                  ?.slice(4, newReleases.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))
              : searchResults
                  ?.slice(4, searchResults.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Body
