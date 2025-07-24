import { getTaiwanStockInfoById, getTaiwanStockMonthRevenue } from '@/lib/actions'

export default async function AnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const stockId = (await params).id
  const stockInfo = await getTaiwanStockInfoById(stockId)

  if (!stockInfo) {
    // TODO: 需要實作如果 stockId 不存在，則導向錯誤頁面或顯示提示訊息
    return <div className="mt-20 text-center text-6xl text-red-500">股票資訊未找到</div>
  }

  const defaultDate = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().slice(0, 10)
  const stockRevenue = await getTaiwanStockMonthRevenue(stockId, defaultDate)

  return (
    <div className="container mx-auto space-y-2 px-4 py-8">
      <section className="border-border rounded-md border bg-white px-5 py-3">
        <h1 className="text-xl font-bold">
          {stockInfo.stock_name} {stockId}
        </h1>
      </section>

      <section className="border-border rounded-md border bg-white px-5 py-3"></section>

      <section className="border-border rounded-md border bg-white px-5 py-3">
        {stockRevenue?.map((revenue) => (
          <div key={revenue.date}>
            {revenue.date} {revenue.revenue}
          </div>
        ))}
      </section>
    </div>
  )
}
