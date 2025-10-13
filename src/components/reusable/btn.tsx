'use client'

import React from 'react'
import { ArrowRightIcon } from '@phosphor-icons/react'

export default function Btn({value, variant} : {value: string, variant?:boolean}) {
  return (
    <button className={`${variant ? 'border border-neutral-300 text-secondary' : 'bg-primary text-secondary'} flex items-center gap-x-2 rounded-full py-3 px-6 text-sm tracking-tighter overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-500`}>
      <div className='relative overflow-hidden'>
        <p className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'>{value}</p>
        <p className='opacity-0'>{value}</p>
        <p className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'>{value}</p>
      </div>
      <div>
        <div className='relative overflow-hidden -rotate-45'>
          <ArrowRightIcon className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'/>
          <ArrowRightIcon className='opacity-0'/>
          <ArrowRightIcon className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'/>
        </div>
      </div>
    </button>
  ) 
}
