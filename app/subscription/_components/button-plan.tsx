"use client"

import { Button } from '@/app/_components/ui/button'
import React from 'react'
import { createStripeCheckout } from '../_actions/create-checkout';
import { loadStripe } from '@stripe/stripe-js'
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function ButtonPlan() {

    const { user } = useUser()

    const handlePlanClick = async () => {
        const { sessionId } = await createStripeCheckout()
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string)
        await stripe?.redirectToCheckout({ sessionId })
    };

    const hasPremium = user?.publicMetadata.subscriptionPlan == 'premium'

    if (hasPremium) {
      return (
        <Button
          variant={"link"}
          className="w-full rounded-full font-bold"
        >
          <Link href={`${process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_URL}?prefilled_email=${user.emailAddresses[0].emailAddress}`}>Gerenciar Plano</Link>
        </Button>
      );
    }
    
    return (
      <Button 
      onClick={handlePlanClick} className="w-full rounded-full font-bold">
        Adquerir Plano
    </Button>
    );
}
