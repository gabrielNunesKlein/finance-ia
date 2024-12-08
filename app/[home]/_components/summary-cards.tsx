
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from 'lucide-react'
import React from 'react'
import SummaryCard from './summary-card'
import { db } from '@/app/_lib/prisma'

interface SummaryCardsProps {
    month: string;
    balance: number;
    depositsTotal: number;
    investimentTotal: number;
    expenseTotal: number;
    userCanAddTransaction?: boolean;
}

export default async function SummaryCards({ month, balance, depositsTotal, investimentTotal, expenseTotal, userCanAddTransaction }: SummaryCardsProps) {

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investimentTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expenseTotal}
        />
      </div>
    </div>
  );
}
