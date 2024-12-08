import React from 'react'
import Navbar from '../_components/navbar'
import { redirect } from 'next/navigation';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { Card, CardContent, CardHeader } from '../_components/ui/card';
import { CheckIcon, XIcon } from 'lucide-react';
import { Button } from '../_components/ui/button';
import ButtonPlan from './_components/button-plan';
import { Badge } from '../_components/ui/badge';
import { getCurrentTransactions } from '../_data/get-current-month-transactions';

export default async function Subscription() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const user = await clerkClient().users.getUser(userId)
  const hasPrimium = user.publicMetadata.subscriptionPlan == 'premium'
  const currebrMonthTransactions = await getCurrentTransactions()
  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">
          Assinatura
        </h1>
        <div className="flex gap-6">
          <Card className='w-[450px]'>
            <CardHeader className='border-b border-solid py-8'>
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center gap-3 justify-center">
                <span className='text-4xl'>R$</span>
                <div className="span font-semibold text-6xl">0</div>
                <div className="text-2xl text-muted-foreground">
                  /mês
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-6 py-8'>
              <div className='flex items-center gap-2'>
                <CheckIcon className='text-primary' />
                <p>Apenas 10 transações por mês ({currebrMonthTransactions}/10)</p>
              </div>
              <div className='flex items-center gap-3'>
                <XIcon />
                <p>Relatorios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className='w-[450px]'>
            <CardHeader className='border-b border-solid py-8 relative'>
            { hasPrimium && (
                <Badge className='absolute left-4 top-12 bg-primary/10 text-primary'>
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center gap-3 justify-center">
                <span className='text-4xl'>R$</span>
                <div className="span font-semibold text-6xl">19</div>
                <div className="text-2xl text-muted-foreground">
                  /mês
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-6 py-8'>
              <div className='flex items-center gap-2'>
                <CheckIcon className='text-primary' />
                <p>Apenas 10 transações por mês.</p>
              </div>
              <div className='flex items-center gap-3'>
                <CheckIcon className='text-primary' />
                <p>Relatorios de IA</p>
              </div>
              <ButtonPlan />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
