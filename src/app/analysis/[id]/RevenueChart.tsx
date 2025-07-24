'use client'

import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import type { ChartOptions } from 'chart.js'

import 'chartjs-adapter-date-fns'
import type { TaiwanStockMonthRevenue } from '@/lib/types'

ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, TimeScale, Tooltip, Legend, PointElement)

const options: ChartOptions = {
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      callbacks: {
        title: function (context: any) {
          const date = context[0].parsed.x
          return new Date(date).toISOString().slice(0, 7)
        },
      },
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'year',
        parser: 'yyyy-MM-dd',
        displayFormats: { year: 'yyyy' },
      },
      grid: {
        tickLength: 0,
      },
      offset: false,
    },
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      ticks: {
        padding: 8,
        callback: function (value, index, ticks) {
          if (index === ticks.length - 1) return '千元'
          return Number(value).toLocaleString()
        },
      },
      grid: {
        tickLength: 0,
      },
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      ticks: {
        callback: function (value, index, ticks) {
          if (index === ticks.length - 1) return '%'
          return value
        },
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
}

export function RevenueChart({ revenueData }: { revenueData: TaiwanStockMonthRevenue[] }) {
  const yoyRate = revenueData.map((revenue) => {
    const lastYearRevenue = revenueData.find(
      (r) => r.revenue_year === revenue.revenue_year - 1 && r.revenue_month === revenue.revenue_month
    )

    return {
      date: revenue.date,
      revenue: lastYearRevenue ? ((revenue.revenue - lastYearRevenue.revenue) / lastYearRevenue.revenue) * 100 : null,
    }
  })

  const chartData = {
    datasets: [
      {
        type: 'line' as const,
        label: '年增率',
        data: yoyRate.map((data) => ({ x: data.date, y: data.revenue })),
        borderColor: '#CB4B4B',
        backgroundColor: '#CB4B4B',
        fill: false,
        tension: 0.1,
        yAxisID: 'y1',
      },
      {
        type: 'bar' as const,
        label: '每月營收',
        data: revenueData.map((data) => ({ x: data.date, y: data.revenue / 1000 })),
        backgroundColor: '#E8AF02',
        yAxisID: 'y',
      },
    ],
  }

  return <Chart type="bar" options={options} data={chartData} />
}
