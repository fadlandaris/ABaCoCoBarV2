'use client'

import React from 'react'
import { ApertureIcon, RocketLaunchIcon } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

export default function Btn({value, variant}: {value: string, variant?:boolean}) {
  const router = useRouter()

  return (
    <button onClick={!variant ? () => router.push('/scan') : () => {}} className={`${variant ? 'bg-gradient-to-b from-foreground to-foreground/70 text-white shadow-[0px_5px_11px_-7px_#ffffff] border-t-2 border-neutral-300/30' : 'bg-gradient-to-b from-primary to-primary/70 text-white shadow-[0px_5px_11px_-7px_#ff3a0d]'} px-4 py-2 rounded-2xl flex items-center gap-x-2  cursor-pointer  hover:scale-110 transition-all duration-600 group`}>
      {!variant ? <ApertureIcon size={18} weight='fill' className='animate-spin' /> : <RocketLaunchIcon size={16} weight='fill' />}
      {value}
    </button>
  )
}
