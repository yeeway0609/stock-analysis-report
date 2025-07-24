'use client'

import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TaiwanStockInfo } from '@/lib/types'
import { getTaiwanStockInfo } from '@/lib/actions'

export function SearchBar() {
  // TODO: 改用 shadcn Command 元件
  const [inputText, setInputText] = useState('')
  const [stocksData, setStocksData] = useState<TaiwanStockInfo[]>([])
  const [filteredStocks, setFilteredStocks] = useState<TaiwanStockInfo[]>([])

  useEffect(() => {
    async function fetchStocks() {
      try {
        const data = await getTaiwanStockInfo()
        const uniqueStocks = data.filter(
          (stock, index, self) => index === self.findIndex((s) => s.stock_id === stock.stock_id)
        )

        setStocksData(uniqueStocks)
        setFilteredStocks(uniqueStocks)
      } catch (error) {
        console.error('Error fetching stocks:', error)
      }
    }

    // EXPLAIN: 由於 API 沒有直接支持搜尋功能，因此在元件掛載時先獲取所有股票資料，再透過前端過濾
    fetchStocks()
  }, [])

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setInputText(value)

    const filtered = stocksData.filter(
      (stock) =>
        stock.stock_id.toLowerCase().includes(value.toLowerCase()) ||
        stock.stock_name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredStocks(filtered)
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

      {inputText.length > 0 && (
        <div className="border-border absolute top-10 left-0 flex w-full flex-col overflow-hidden rounded-md border">
          {filteredStocks.slice(0, 10).map((stock) => (
            <Link
              className="inline-block w-full bg-white px-2 py-1 hover:bg-gray-200"
              key={stock.stock_id}
              href={`/analysis/${stock.stock_id}`}
              onClick={() => setInputText('')}
            >
              {stock.stock_name} {stock.stock_id}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
