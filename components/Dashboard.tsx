import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import SpotifyWebApi from 'spotify-web-api-node'
import { playingTrackState, playState } from '../atoms/playerAtom'
import Body, { Track } from './Body'
import Player from './Player'
import Right from './Right'
import Sidebar from './Sidebar'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
})

const Dashboard = () => {
  const { data: session } = useSession()
  const accessToken = session?.accessToken

  const setPlay = useSetRecoilState(playState)
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)
  const [showPlayer, setShowPlayer] = useState(false)

  /* porque no lo sacó en true desde un principio?? */
  useEffect(() => {
    setShowPlayer(true)
  }, [])

  const chooseTrack = (track: Track) => {
    setPlayingTrack(track)
    setPlay(true)
  }

  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <div className="flex min-w-max mx-auto">
        <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
        <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      </div>

      {showPlayer && (
        <div className="fixed inset-x-0 bottom-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      )}
    </main>
  )
}
export default Dashboard
