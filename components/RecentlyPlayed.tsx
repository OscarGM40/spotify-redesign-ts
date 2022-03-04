import React from 'react'
import { useRecoilState } from 'recoil'
import { playingTrackState, playState } from '../atoms/playerAtom'
import { Track } from './Body'

type Props = {
  track: Track
  chooseTrack: (track: Track) => void
}

const RecentlyPlayed = ({ track, chooseTrack }: Props) => {
  const [play, setPlay] = useRecoilState(playState)
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)

  /* esta funcion ya la ha repetido tres veces,debió haber usado un helper */
  const handlePlay = () => {
    chooseTrack(track)

    if (track.uri === playingTrack?.uri) {
      setPlay(!play)
    }
  }

  return (
    <div className="flex items-center space-x-3 ">
      <img
        src={track.albumUrl}
        alt=""
        className="h-[52px] w-[52px] rounded-full"
      />
      <div className="">
        <h4 className="mb-0.5 max-w-[150px] cursor-pointer truncate text-[13px] font-semibold text-white hover:underline">
          {track.title}
        </h4>
        <p className="cursor-pointer text-xs font-semibold text-[#686868] hover:underline">
          {track.artist}
        </p>
      </div>
    </div>
  )
}

export default RecentlyPlayed
