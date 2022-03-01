

import { atom } from 'recoil'
import { Track } from '../components/Body'

export const playState = atom({
  key: 'playState',
  default: false,
})

export const playingTrackState = atom<Track | null>({
  key: 'playingTrackState',
  default: null,
})
