"use client"

import { PiggyBankIcon, TrendingDownIcon, TrendingUp, TrendingUpIcon } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent
} from "@/app/_components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart"
import { TransactionType } from "@prisma/client"
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/type"
import PercentageItem from "./percentage-item"

const chartConfig = {
    [TransactionType.INVESTMENT]: {
      label: "Investido",
      color: "#FFFFFF",
    },
    [TransactionType.DEPOSIT]: {
      label: "Receita",
      color: "#55B02E",
    },
    [TransactionType.EXPENSE]: {
      label: "Despesas",
      color: "#E93030",
    },
  } satisfies ChartConfig;
  

interface TransactionChartProps {
    depositsTotal: number;
    investimentTotal: number;
    expenseTotal: number;
    typesPercentage: TransactionPercentagePerType;
}


export default function TransactionsChart({ depositsTotal, investimentTotal, expenseTotal, typesPercentage }: TransactionChartProps) {
    const chartData = [
        {
          type: TransactionType.DEPOSIT,
          amount: depositsTotal,
          fill: "#55B02E",
        },
        {
          type: TransactionType.EXPENSE,
          amount: expenseTotal,
          fill: "#E93030",
        },
        {
          type: TransactionType.INVESTMENT,
          amount: investimentTotal,
          fill: "#FFFFFF",
        },
      ];
  return (
    <Card className="flex flex-col p-6">
      {/* <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
            <PercentageItem 
                icon={<TrendingUpIcon size={16} className="text-primary" />}
                title="Receita"
                value={typesPercentage[TransactionType.DEPOSIT]}
            />

            <PercentageItem 
                icon={<TrendingDownIcon size={16} className="text-red-500" />}
                title="Despesas"
                value={typesPercentage[TransactionType.EXPENSE]}
            />

            <PercentageItem 
                icon={<PiggyBankIcon size={16} className="text-primary" />}
                title="Investimento"
                value={typesPercentage[TransactionType.INVESTMENT]}
            />
        </div>
      </CardContent>
    </Card>
  )
}
