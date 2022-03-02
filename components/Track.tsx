import React from 'react'
import { Track } from './Body'
import { ImHeadphones } from 'react-icons/im'

type Props = {
  track: Track
  chooseTrack: any
}

const Track = ({ track, chooseTrack }: Props) => {
  return (
    <div className="group flex cursor-default items-center justify-between space-x-20 rounded-lg py-2 px-4 transition duration-200 ease-out hover:bg-white/10">
      <div className="flex items-center">
        <img
          src={track.albumUrl}
          alt=""
          className="mr-3 h-12 w-12 rounded-xl object-cover"
        />
        <div className="">
          <h4 className="w-[450px] truncate text-sm font-semibold text-white">
            {track.title}
          </h4>
          <p className="text-[13px] font-semibold text-[rgb(179,179,179)] group-hover:text-white">
            {track.artist}
          </p>
        </div>
      </div>
        <div className="flex items-center space-x-2.5 md:ml-auto">
          <div className="text-white flex space-x-1 text-sm font-semibold">
            <ImHeadphones className="text-lg" />
            <h4>{track.popularity}</h4>
          </div>

    <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40"></div>

        </div>
    </div>
  )
}

export default Track
