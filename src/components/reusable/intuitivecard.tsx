'use client'

import React from 'react'

import { RocketLaunchIcon } from '@phosphor-icons/react'

export default function IntuitiveCard() {
  return (
    <div className='w-[300px] h-[200px] rounded-3xl border flex flex-col justify-between flex-col justify-between p-1 rounded-2xl bg-[#e6e2d9] shadow-[0px_0px_8px_0px_#fcf8ef]'>
      <div className='rounded-2xl w-full h-full flex flex-col justify-between gap-y-2'>
        <div className='w-full h-[80%] rounded-2xl bg-[#fcf8ef] p-2 gap-y-1 p-1 flex justify-between gap-x-2'>
          <div className=' text-black w-full h-full rounded-md border-l-3 border-primary p-4 bg-primary/10 flex flex-col justify-between font-secondary'>
            <h1 className='text-lg font-medium text-neutral-500 font-medium'>Scan Accuracy</h1>
            <p className='text-3xl text-foreground'>85%</p>
            <div className='flex items-center'>
              <div className='w-[85%] h-[8px] bg-primary rounded-l-2xl'/>
              <div className='w-[15%] h-[8px] bg-neutral-300 rounded-r-2xl'/>
            </div>
          </div>
        </div>
         <button className='rounded-2xl h-[20%] bg-gradient-to-b from-foreground to-foreground/70 text-white shadow-[0px_5px_11px_-7px_#ffffff] border-t-2 border-neutral-300/30 flex items-center justify-center font-secondary font-normal cursor-pointer gap-x-2'>
          <RocketLaunchIcon size={16} className='' weight='fill'/>
          Scan
        </button>
      </div>
    </div>
  )
}
