import { getTaiwanStockInfoById, getTaiwanStockMonthRevenue } from '@/lib/actions'
import { RevenueChart } from './RevenueChart'

interface AnalysisPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ 'period-year'?: string }>
}

const periodYearsOptions = ['1', '3', '5', '10']

export default async function AnalysisPage({ params, searchParams }: AnalysisPageProps) {
  const stockId = (await params).id
  const rawPeriodYear = (await searchParams)['period-year'] || ''
  const periodYear = periodYearsOptions.includes(rawPeriodYear) ? rawPeriodYear : '5'
  const stockInfo = await getTaiwanStockInfoById(stockId)

  if (!stockInfo) {
    return <div className="mt-20 text-center text-6xl text-red-500">股票資訊未找到</div>
  }

  const startDate = getStartDate(periodYear)
  const stockRevenue = await getTaiwanStockMonthRevenue(stockId, startDate)

  return (
    <div className="mx-auto w-full max-w-[720px] space-y-2 px-4 py-8">
      {/* 標題區塊 */}
      <section className="border-border rounded-md border bg-white px-5 py-3">
        <h1 className="text-xl font-bold">
          {stockInfo.stock_name} {stockId}
        </h1>
      </section>

      {stockRevenue ? (
        <>
          {/* 每月營收圖表 */}
          <section className="border-border rounded-md border bg-white px-5 py-3">
            <RevenueChart revenueData={stockRevenue} />
          </section>

          {/* 每月營收表格 */}
          <section className="border-border rounded-md border bg-white py-3">
            <table className="flex gap-1 overflow-hidden text-sm">
              <thead className="shrink-0">
                <tr className="[&_th]:border-border border-border flex flex-col border-t border-r text-left font-semibold [&_th]:border-b">
                  <th className="bg-gray-100 px-5 py-3">年度/月份</th>
                  <th className="px-5 py-3">每月營收</th>
                  <th className="px-5 py-3">單月營收年增率 (%)</th>
                </tr>
              </thead>
              <tbody className="flex flex-row-reverse overflow-x-auto">
                {stockRevenue.reverse().map((revenue) => {
                  const lastYearRevenue = stockRevenue.find(
                    (r) => r.revenue_year === revenue.revenue_year - 1 && r.revenue_month === revenue.revenue_month
                  )

                  const yearOverYearRate = lastYearRevenue
                    ? (((revenue.revenue - lastYearRevenue.revenue) / lastYearRevenue.revenue) * 100).toFixed(2)
                    : '-'

                  return (
                    <tr
                      key={revenue.date}
                      className="[&_td]:border-border flex flex-col border-t text-right [&_td]:border-b [&_td]:border-l"
                    >
                      <td className="bg-gray-100 px-5 py-3 font-semibold">
                        {revenue.revenue_year}/{revenue.revenue_month.toString().padStart(2, '0')}
                      </td>
                      <td className="px-5 py-3">{Number(revenue.revenue).toLocaleString()}</td>
                      <td className="px-5 py-3">{yearOverYearRate}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </section>
        </>
      ) : (
        <div className="mt-20 text-center text-6xl text-gray-500">無營收資料</div>
      )}
    </div>
  )
}

function getStartDate(year: string) {
  const date = new Date()
  date.setFullYear(date.getFullYear() - parseInt(year))
  return date.toISOString().slice(0, 10)
}
