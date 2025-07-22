import { SearchIcon } from "lucide-react"

export function SearchBar() {
  return (
    <div className="flex w-full max-w-[400px] border border-border items-center rounded-md justify-between p-2.5">
      <input
        className="w-full leading-1 text-base focus:outline-none"
        type="text"
        placeholder="輸入台/美股代號，查看公司價值"
      />
      <SearchIcon className=" size-4 text-gray-800" />
    </div>
  )
}
