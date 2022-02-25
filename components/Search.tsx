import { MdOutlineShortText } from 'react-icons/md';

interface Props {
  search: string
  setSearch: (search: string) => void
}

const Search = ({ search, setSearch }: Props) => {
  return (
    <div className="flex max-w-[1150px] items-center overflow-hidden rounded-full border-2 border-[#333333] bg-[#1a1a1a] p-1.5 px-5 pr-8">
      <div className="h-5 w-5 flex-shrink-0 animate-pulse rounded-full border-2"></div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="outline:none placeholder:[#fafafa] border-none bg-[#1a1a1a] text-sm text-white focus:ring-0 lg:w-full"
        placeholder="Search..."
      />

      <div className="flex items-center divide-dotted divide-x-2 divide-[#333] ml-auto">
        <div className="flex space-x-2 pr-5">
          <button className="tag">Minimal</button>
          <button className="tag">House</button>
          <button className="tag">Minimal</button>
        </div>
        <div className="flex items-center space-x-1.5 text-[#cecece] pl-4">
          <MdOutlineShortText  className="text-2xl animate-pulse" />
          <span className="font-medium text-sm">Filters</span>
        </div>
      </div>
    </div>
    )
}

export default Search
