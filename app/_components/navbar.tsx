
"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navbar() {
  const pathName = usePathname()

  return (
    <nav className='flex justify-between border-b border-solid px-8 p-7 y-4'>
        <div className='flex items-center gap-10'>
            <Image src="/logo.svg" width={173} height={39} alt='Finance AI' />
            <Link href="/home" className={ pathName == "/" ? 'text-primary' : 'text-muted-foreground'}>
                Dashboard
            </Link>
            <Link href="transactions" className={ pathName == "/transactions" ? 'text-primary' : 'text-muted-foreground'}>
                Transações
            </Link>
            <Link href="subscription" className={ pathName == "/subscription" ? 'text-primary' : 'text-muted-foreground'}>
                Assinatura
            </Link>
        </div>
        <UserButton showName />
    </nav>
  )
}
