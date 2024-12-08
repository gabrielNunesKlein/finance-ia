"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import UpsertTransaction from "./upsert-transaction";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean
}

export default function AddTransactionButton({ userCanAddTransaction }: AddTransactionButtonProps) {
    const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={!userCanAddTransaction}
              className="rounded-full font-bold"
              onClick={() => setDialogOpen(true)}
          >
            Adicionar Transação
            <ArrowDownUpIcon />
          </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              "Você atingiu o limite de transações. Atualize seu plano para criar transações ilimitadas."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransaction isOpen={dialogOpen} setIsOpen={setDialogOpen} />
    </>
  );
}
