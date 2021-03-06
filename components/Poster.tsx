import React from 'react'
import { Track } from './Body'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { playingTrackState, playState } from '../atoms/playerAtom'

type Props = {
  track: Track
  chooseTrack?: any
}

const Poster = ({ track, chooseTrack }: Props) => {
  const [play, setPlay] = useRecoilState(playState)
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)

  const handlePlay = () => {
    chooseTrack(track)

    if (track.uri === playingTrack?.uri) {
      setPlay(!play)
    }
  }

  return (
    <div
      className="group relative mx-auto h-[360px] w-[260px] cursor-pointer overflow-hidden rounded-[50px] text-white/80 transition duration-300 ease-out hover:scale-105 hover:text-white/100"
      onClick={handlePlay}
    >
      {/* dado que cada Url va a ser diferente tengo que usar <img> y no Image */}
      <img
        src={track.albumUrl}
        alt=""
        className="absolute inset-0 h-full w-full rounded-[50px] object-cover opacity-80 transition duration-200 group-hover:opacity-100 "
      />
      <div className="absolute inset-x-0 bottom-10 ml-4 flex items-center space-x-3.5">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#15883e] transition duration-200 group-hover:bg-[#1db954]">
          {track.uri === playingTrack?.uri && play ? (
            <BsFillPauseFill className="h-6 w-6" />
          ) : (
            <BsFillPlayFill className="ml-[1px] h-6 w-6" />
          )}
        </div>

          <div className="text-[16px]">
            <h4 className="font-extrabold truncate w-44">{track.title}</h4>
            <h6 className="text-sm">{track.artist}</h6>

          </div>
        
      </div>
    </div>
  )
}

export default Poster
