import { SearchIcon } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="border-border flex w-full max-w-[400px] items-center justify-between rounded-md border p-2.5">
      <input
        className="w-full text-base leading-1 focus:outline-none"
        type="text"
        placeholder="輸入台/美股代號，查看公司價值"
      />
      <SearchIcon className="size-4 text-gray-800" />
    </div>
  )
}
