import { HiOutlineShieldCheck } from 'react-icons/hi'
import { MdOutlineSettings } from 'react-icons/md'
import { BiBell } from 'react-icons/bi'
import { ViewGridIcon } from '@heroicons/react/solid'
import Dropdown from './Dropdown'
import SpotifyWebApi from 'spotify-web-api-node'
import { Track } from './Body'
import RecentlyPlayed from './RecentlyPlayed'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface Props {
  spotifyApi: SpotifyWebApi
  chooseTrack: (track: Track) => void
}

const Right = ({spotifyApi,chooseTrack}: Props) => {
  const { data: session } = useSession()
  const  accessToken = session?.accessToken;
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>()

  // Recently Played Tracks...
  useEffect(() => {
    if (!accessToken) return

    // spotifyApi.getMyRecentlyPlayedTracks({ limit: 10 }).then((res) => {
    spotifyApi.getNewReleases({ limit: 10 }).then((res) => {
      setRecentlyPlayed(
        // res.body.items.map(({ track }) => ({
        res.body.albums?.items.map((track) => ({
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
            //@ts-ignore
            // albumUrl: track.album.images[0].url,
        }))
    )});
  }, [accessToken])



  return (
    <section className="space-y-8 p-4 pr-8 ">
      <div className="flex items-center justify-between space-x-2">
        {/* Icons */}
        <div className="flex h-12 items-center space-x-4 rounded-full border-2 border-[#262626] py-3 px-4">
          <HiOutlineShieldCheck className="text-xl text-[#CCCCCC]" />
          <MdOutlineSettings className="text-xl text-[#CCCCCC]" />
          <div>
            <BiBell className="text-xl text-[#CCCCCC]" />
          </div>
        </div>
        {/* Profile  */}
        <Dropdown />
      </div>
      {/* Recently Played Tracks */}
      <div className="space-y-4 rounded-xl border-2 border-[#262626] bg-[#0d0d0d] p-4">
        <div className="flex items-center justify-between ">
          <h4 className="text-small font-semibold text-white">
            Recently Played
          </h4>
          <ViewGridIcon className="h-6 text-[#686868]" />
        </div>

        <div className="h-[250px] space-y-4 overflow-y-scroll scrollbar-hide overflow-x-hidden md:h-[400px]">
          {recentlyPlayed?.map((track, index) => (
            <RecentlyPlayed
              key={index}
              track={track}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
        <button className="w-full rounded-2xl bg-[#1A1A1A] bg-opacity-80 py-3.5 px-4 text-[13px] font-bold text-[#CECECE] transition ease-out hover:bg-opacity-100">
          View All
        </button>
      </div>
    </section>
  )
}

export default Right
