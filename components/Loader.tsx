import { ThreeBounce } from 'better-react-spinkit'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className="h-screen bg-black">
      <div className="flex flex-col items-center space-y-4 pt-40">
        <span className="relative h-[250px] w-[400px] lg:h-[240px] lg:w-[550px]">
          <Image
            // src="https://rb.gy/y9mwtb"
            src="/images/spotify2019Dos.jpg"
            layout="fill"
            objectFit="contain"
            className="animate-pulse"
          />
        </span>
        <ThreeBounce size={23} color="#15883e" />
      </div>
    </div>
  )
}

export default Loader
