'use client'

import React from 'react'
import { FediverseLogoIcon } from '@phosphor-icons/react'
import { navLinks } from '@/data/data'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='w-[440px] h-[50px] rounded-full mx-auto fixed z-50 top-[24px] left-1/2 -translate-x-1/2 bg-foreground py-[10px] px-[20px] text-white flex items-center justify-between border border-neutral-800'>
      <div className='rounded-md bg-primary p-1'>
        <FediverseLogoIcon weight='fill' size={18}/>
      </div>

      <div className='flex items-center gap-x-4'>
        <div className='flex items-center gap-x-4'>
          {navLinks.map((item, i) => {
            return (
              <Link key={i} href={''} className='capitalize text-neutral-400'>
                {item.nav}
              </Link>
            )
          })}
        </div>
        <button className='py-1 px-2 rounded-full border border-neutral-700 bg-[#202020] text-[14px]'>
          Get started
        </button>
      </div>
    </nav>
  )
}
