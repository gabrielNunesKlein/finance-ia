"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "../_constants/transactions";
import { DatePicker } from "./ui/date-picker";
import { addTransaction } from "./_actions/add-transaction";

const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "O nome é obrigatorio",
    }),
    amount: z.number().min(1, {
      message: "Valor é obrigatorio",
    }),
    type: z.nativeEnum(TransactionType, {
      required_error: "O tipo é obrigatorio.",
    }),
    category: z.nativeEnum(TransactionCategory, {
      required_error: "A categoria é obrigatorio.",
    }),
    paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
      required_error: "O método de pagamento é obrigatorio.",
    }),
  
    date: z.date({
      required_error: "A data é obrigatoria.",
    }),
  });
  
  type FormSchema = z.infer<typeof formSchema>

interface UpsertTransactionDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    transactionId?: string;
    defaultValues?: FormSchema;
}

export default function UpsertTransaction(props: UpsertTransactionDialogProps) {

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: props.defaultValues ?? {
          amount: 50,
          category: TransactionCategory.OTHER,
          date: new Date(),
          name: "",
          paymentMethod: TransactionPaymentMethod.CASH,
          type: TransactionType.EXPENSE,
        },
      });
    
      const onSubmit = async (data: FormSchema) => {
        try {
            await addTransaction({...data, id: props.transactionId })
            props.setIsOpen(false)
            form.reset()
        } catch(err){
            console.log(err)
        }
        
      };

      
  return (
    <Dialog
        open={props.isOpen}
        onOpenChange={(open) => {
            props.setIsOpen(open)
            if(!open){
                form.reset();
            }
        }}
    >
      <DialogTrigger asChild>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle> {props.transactionId ? 'Atualizar' : 'Adicionar'} Transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput placeholder="Digite Valor" 
                    onValueChange={({ floatValue }) => field.onChange(floatValue)}
                    value={field.value}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione o Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o Tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a Categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit">{props.transactionId ? 'Atualizar' : 'Adicionar'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
