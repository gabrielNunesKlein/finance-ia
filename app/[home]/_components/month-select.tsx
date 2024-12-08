"use client"

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/app/_components/ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const MONTHS_SELECT = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
]

export default function MonthSelect() {

    const { push } = useRouter()
    const searchParams = useSearchParams()
    const month = searchParams.get('month')
    const handleMonthChange = (month: string) => {
        push(`/home/?month=${month}`)
    }

  return (
    <Select onValueChange={(value) => handleMonthChange(value)} defaultValue={month ?? ''}>
        <SelectTrigger className='w-[150px] rounded-full'>
            <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
            {MONTHS_SELECT.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}
