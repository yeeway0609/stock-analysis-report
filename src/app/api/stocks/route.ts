import { NextResponse } from 'next/server'

export async function GET() {
  const token = process.env.FINMIND_API_TOKEN
  const res = await fetch(
    'https://api.finmindtrade.com/api/v4/data?' +
      new URLSearchParams({
        dataset: 'TaiwanStockInfo',
      }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const json = await res.json()
  return NextResponse.json(json.data)
}
