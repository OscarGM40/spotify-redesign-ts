import { useSetRecoilState } from 'recoil'
import SpotifyWebApi from 'spotify-web-api-node'
import { playingTrackState, playState } from '../atoms/playerAtom'
import Body, { Track } from './Body'
import Right from './Right'
import Sidebar from './Sidebar'

const spotifyApi= new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
})


const Dashboard = () => {

   const setPlay = useSetRecoilState(playState)
   const setPlayingTrack = useSetRecoilState(playingTrackState)

  const chooseTrack = (track: Track) => {
    setPlayingTrack(track)
    setPlay(true)
  }
  
  return (
    <main>
      <Sidebar />
      <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack}/>
      <Right />
    </main>
  )
}
export default Dashboard
