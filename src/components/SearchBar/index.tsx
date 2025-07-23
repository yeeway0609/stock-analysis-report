'use client'

import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import Link from 'next/link'
import { TaiwanStockInfo } from '@/lib/types'

export function SearchBar() {
  const [inputText, setInputText] = useState('')
  const [results, setResults] = useState<TaiwanStockInfo[] | null>(null)

  async function fetchStocks(query: string): Promise<TaiwanStockInfo[]> {
    const response = await fetch('/api/stocks')
    const data: TaiwanStockInfo[] = await response.json()
    return data
  }

  const debouncedSearchStock = useDebouncedCallback(async (input: string) => {
    if (!input) return

    try {
      const results = await fetchStocks(inputText)
      if (!results) return
      setResults(results)
    } catch (error) {
      console.error('Error occurred while searching for stocks:', error)
    }
  }, 300)

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setInputText(value)
    debouncedSearchStock(value)
  }

  return (
    <div className="border-border relative flex h-10 w-full max-w-[400px] items-center justify-between rounded-md border p-2.5">
      <input
        className="w-full text-base leading-1 focus:outline-none"
        type="text"
        value={inputText}
        placeholder="輸入台/美股代號，查看公司價值"
        onChange={handleSearchChange}
      />
      <button className="pl-2.5">
        <SearchIcon className="size-4 text-gray-800" />
      </button>

      {results && (
        <div className="border-border absolute top-10 left-0 flex w-full flex-col overflow-hidden rounded-md border">
          {results.slice(0, 5).map((stock) => (
            <Link
              className="inline-block w-full bg-white px-2 py-1 hover:bg-gray-200"
              key={stock.stock_id}
              href={`/analysis/${stock.stock_id}`}
            >
              {stock.stock_name} {stock.stock_id}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
