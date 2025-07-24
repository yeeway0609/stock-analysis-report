/** 台股總覽，See https://finmind.github.io/tutor/TaiwanMarket/Technical/#taiwanstockinfo  */
export interface TaiwanStockInfo {
  industry_category: string
  stock_id: string
  stock_name: string
  type: string
  date: string
}

/** 月營收表，See https://finmind.github.io/tutor/TaiwanMarket/Fundamental/#taiwanstockmonthrevenue */
export interface TaiwanStockMonthRevenue {
  date: string // YYYY-MM-DD 格式
  stock_id: string
  country: string
  revenue: number
  revenue_month: number
  revenue_year: number
}
