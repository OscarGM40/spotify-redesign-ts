import { HiOutlineShieldCheck } from 'react-icons/hi'
import { MdOutlineSettings } from 'react-icons/md'
import { BiBell } from 'react-icons/bi'
import { ViewGridIcon } from '@heroicons/react/solid'
import Dropdown from './Dropdown'

interface Props {}

const Right = (props: Props) => {
  return (
    <section className="space-y-8 p-4 pr-8">
      <div className="flex items-center justify-between space-x-2">
        {/* Icons */}
        <div className="flex h-12 items-center space-x-4 rounded-full border-2 border-[#262626] py-3 px-4">
          <HiOutlineShieldCheck className="text-xl text-[#CCCCCC]" />
          <MdOutlineSettings className="text-xl text-[#CCCCCC]" />
          <div>
            <BiBell className="text-xl text-[#CCCCCC]" />
          </div>
        {/* Profile  */}
        </div>
        <Dropdown />

      </div>
    </section>
  )
}
export default Right
