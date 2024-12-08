import { Badge } from '@/app/_components/ui/badge'
import { Transaction, TransactionType } from '@prisma/client'
import { CircleIcon } from 'lucide-react'
import React from 'react'

interface TypeBadgeProps {
    transaction: Transaction
}

export default function TypeBadge({ transaction }: TypeBadgeProps) {
    if(transaction.type === TransactionType.DEPOSIT){
        return (
            <Badge className="bg-muted text-primary hover:bg-muted font-bold">
                <CircleIcon className="fill-primary mr-2" />
                Deposito
            </Badge>
        )
    }

    if(transaction.type === TransactionType.EXPENSE){
        return (
            <Badge className="font-bold text-danger bg-danger bg-opacity-10 hover:bg-muted">
                <CircleIcon className="fill-destructive mr-2" />
                Despesa
            </Badge>
        )
    }

    return (
        <Badge className="font-bold text-white bg-white bg-opacity-10 hover:bg-muted">
            <CircleIcon className="fill-white mr-2" />
            Investimento
        </Badge>
    )
}
