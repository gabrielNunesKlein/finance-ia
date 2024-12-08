"use client"

import { Transaction } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import TypeBadge from "../_components/type-badge"
import { Button } from "@/app/_components/ui/button"
import { PencilIcon, TrashIcon } from "lucide-react"
import EditTransactionButton from "../_components/edit-transaction-button"

export const TRANSACTION_CATEGORY_LABELS = {
    EDUCATION: "Educação",
    ENTERTAINMENT: "Entretenimento",
    FOOD: "Alimentação",
    HEALTH: "Saúde",
    HOUSING: "Habitação",
    OTHER: "Outros",
    SALARY: "Slário",
    TRANSPORTATION: "Transporte",
    UTILITY: "Utilidades",
}

export const TRANSACTION_PAYMENT_METHOD_LABELS ={
    BANK_TRANSFER: "Transferência Bancária",
    BANK_SLIP: "Boleto Bancário",
    CASH: "Dinheiro",
    CREDIT_CARD: "Cartão de Crédito",
    DEBIT_CARD: "Cartão de Debito",
    OTHER: "Outros",
    PIX: "PIX",
}

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction }}) => <TypeBadge transaction={transaction} />
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction }}) => 
        // @ts-ignore
        TRANSACTION_CATEGORY_LABELS[transaction.category]
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction }}) => TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction }}) => 
        new Date(transaction.date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction }}) => 
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(Number(transaction.amount))
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction }}) => {
        return (
            <div className="space-x-1">
                <EditTransactionButton transaction={transaction} />
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <TrashIcon />
                </Button>
            </div>
        )
    }
  }
]
