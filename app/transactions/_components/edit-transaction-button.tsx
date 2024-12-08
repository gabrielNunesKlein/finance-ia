import { Button } from '@/app/_components/ui/button';
import UpsertTransaction from '@/app/_components/upsert-transaction';
import { Transaction } from '@prisma/client';
import { PencilIcon } from 'lucide-react';
import React, { useState } from 'react'

interface EditTransactionEditProps {
    transaction: Transaction
}

export default function EditTransactionButton({ transaction }: EditTransactionEditProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertTransaction isOpen={dialogOpen} setIsOpen={setDialogOpen} defaultValues={{
            ...transaction,
            amount: Number(transaction.amount)
        }}
        transactionId={transaction.id} 
      />
    </>
  );
}
