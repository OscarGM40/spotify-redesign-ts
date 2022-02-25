import {
  ChartBarIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HomeIcon,
} from '@heroicons/react/solid'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { RiCompassFill } from 'react-icons/ri'
import Image from 'next/image'


const Sidebar = () => {
  return (
    <section className="fixed top-0 z-50 flex h-screen w-[90px] flex-col items-center space-y-10 bg-black p-4">
      <Image
        src="https://rb.gy/xkacau"
        width={60}
        height={60}
        objectFit="contain"
      />

      <div className="flex flex-col space-y-10">
        <HomeIcon className="sidebarIcon text-white opacity-[0.85]" />
        <RiCompassFill className="sidebarIcon text-2xl" />
        <FaMicrophoneAlt className="sidebarIcon ml-1" />
        <ChartBarIcon className="sidebarIcon" />
        <ClockIcon className="sidebarIcon" />
        <DotsHorizontalIcon className="sidebarIcon" />
      </div>
    </section>
  )
}

export default Sidebar
