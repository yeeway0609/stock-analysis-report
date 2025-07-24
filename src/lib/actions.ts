'use server'

import { TaiwanStockInfo, TaiwanStockMonthRevenue } from '@/lib/types'

const API_TOKEN = process.env.FINMIND_API_TOKEN

/** 獲取台股基本資訊 */
export async function getTaiwanStockInfo(): Promise<TaiwanStockInfo[]> {
  try {
    const res = await fetch(
      'https://api.finmindtrade.com/api/v4/data?' +
        new URLSearchParams({
          dataset: 'TaiwanStockInfo',
        }),
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    )

    const json = await res.json()

    return (json.data as TaiwanStockInfo[]) || []
  } catch (error) {
    console.error('獲取股票資訊時發生錯誤:', error)
    throw new Error('無法獲取股票資訊')
  }
}

/**
 * 獲取指定股票的基本資訊
 * @param stock_id - 股票代號
 */
export async function getTaiwanStockInfoById(stock_id: string): Promise<TaiwanStockInfo | null> {
  try {
    if (!stock_id) {
      throw new Error('stock_id is required')
    }

    const res = await fetch(
      'https://api.finmindtrade.com/api/v4/data?' +
        new URLSearchParams({
          dataset: 'TaiwanStockInfo',
          data_id: stock_id,
        }),
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    )

    const json = await res.json()
    const data = json.data as TaiwanStockInfo[]
    const uniqueStock = data.filter(
      (stock, index, self) => index === self.findIndex((s) => s.stock_id === stock.stock_id)
    )

    return uniqueStock.length > 0 ? uniqueStock[0] : null
  } catch (error) {
    console.error(`獲取股票 ${stock_id} 資訊時發生錯誤:`, error)
    throw new Error(`無法獲取股票 ${stock_id} 的資訊`)
  }
}

/**
 * 獲取指定股票的月營收資訊
 * @param stock_id - 股票代號
 * @param start_date - 起始日期，格式為 YYYY-MM-DD
 */
export async function getTaiwanStockMonthRevenue(
  stock_id: string,
  start_date: string
): Promise<TaiwanStockMonthRevenue[] | null> {
  try {
    if (!stock_id) throw new Error('stock_id is required')
    if (!start_date) throw new Error('start_date is required')

    const res = await fetch(
      'https://api.finmindtrade.com/api/v4/data?' +
        new URLSearchParams({
          dataset: 'TaiwanStockMonthRevenue',
          data_id: stock_id,
          start_date: start_date,
        }),
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    )

    const json = await res.json()
    const data = json.data as TaiwanStockMonthRevenue[]

    return data.length > 0 ? data : null
  } catch (error) {
    console.error(`獲取股票 ${stock_id} 資訊時發生錯誤:`, error)
    throw new Error(`無法獲取股票 ${stock_id} 的資訊`)
  }
}
