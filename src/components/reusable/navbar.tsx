"use client"

import React from 'react'
import { FediverseLogoIcon } from '@phosphor-icons/react'
import { navLinks } from '@/data/data'
import { useRouter, usePathname } from 'next/navigation'
import { SignInButton, SignedOut, SignedIn, UserButton } from '@clerk/nextjs'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav className='w-[280px] sm:w-[440px] h-[50px] rounded-full mx-auto fixed z-50 top-[24px] left-1/2 -translate-x-1/2 bg-foreground py-[10px] px-[20px] text-white flex items-center justify-between border border-neutral-800'>
      <button onClick={()=>router.push("/") } className='rounded-md bg-primary p-1 cursor-pointer'>
        <FediverseLogoIcon weight='fill' size={18}/>
      </button>

      <div className='flex items-center gap-x-4'>
        <div className='flex items-center gap-x-4'>
          {navLinks.map((item, i) => {
            return (
              <button key={i} onClick={()=>router.push(item.link) } className={`${pathname === item.link ? 'text-white' : ''} capitalize text-neutral-400 cursor-pointer hover:text-white transition-all duration-600`}>
                {item.nav}
              </button>
            )
          })}
        </div>

        <SignedOut>
          <SignInButton mode="modal" >
            <button className='py-1 px-2 rounded-full border border-neutral-700 bg-[#202020] text-[14px] cursor-pointer'>
              Sign In
            </button>
        </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>
    </nav>
  )
}
