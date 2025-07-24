import Link from 'next/link'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { PeriodKey } from '@/lib/types'

const periodOptions: Record<PeriodKey, string> = {
  '3': '近 3 年',
  '5': '近 5 年',
  '10': '近 10 年',
  '15': '近 15 年',
}

export function PeriodSelect({ currentPeriod = '5' }: { currentPeriod: PeriodKey }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-[90px] bg-[#0686F4] hover:bg-[#0571D9]">
          {periodOptions[currentPeriod]} <ChevronDownIcon className="inline-block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[90px]">
        {Object.entries(periodOptions).map(([key, label]) => (
          <Link key={key} href={`?period-year=${key}`}>
            <DropdownMenuItem>{label} </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
