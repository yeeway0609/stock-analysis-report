export default async function AnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const stockId = (await params).id

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">股票分析報告: {stockId}</h1>
    </div>
  )
}
