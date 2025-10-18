'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'
import { RocketLaunchIcon } from '@phosphor-icons/react'

export default function PdfCard() {
  return (
    <div className=' w-[300px] h-[300px] flex flex-col justify-between p-1 rounded-2xl bg-[#e6e2d9] shadow-[0px_0px_8px_0px_#fcf8ef]'>
      <div className='rounded-2xl w-full h-full flex flex-col justify-between gap-y-3'>
        <div className='w-full h-[85%] rounded-2xl bg-[#fcf8ef] p-1 grid grid-cols-1 gap-y-1'>
          <div className='bg-[#f0ece3] rounded-2xl font-secondary text-foreground tracking-tighter font-normal flex items-center overflow-hidden'>
            <div className='w-full'>
              <p className='pl-3 mb-1 font-medium'>ABaCoCoBar</p>
               <Marquee autoFill={true} direction='left'>
                <p className='py-1 px-2 bg-gradient-to-b from-primary to-primary/70 text-white rounded-full text-sm mx-1'>Bacteria</p>
                <p className='py-1 px-2 bg-[#f2efeb] text-neutral-400 rounded-full text-sm mx-1'>Colony</p>
                <p className='py-1 px-2 bg-[#f2efeb] text-neutral-400 rounded-full text-sm mx-1'>Scanner</p>
              </Marquee>
            </div>
          </div>
          <div className='bg-[#f0ece3] rounded-2xl font-secondary text-foreground tracking-tighter font-normal flex items-center overflow-hidden'>
            <div className='w-full'>
              <p className='pl-3 mb-1 font-medium'>Why choose us?</p>
               <Marquee autoFill={true} direction='right'>
                <p className='py-1 px-2 bg-gradient-to-b from-primary to-primary/70 text-white rounded-full text-sm mx-1'>Easy</p>
                <p className='py-1 px-2 bg-[#f2efeb] text-neutral-400 rounded-full text-sm mx-1'>free</p>
                <p className='py-1 px-2 bg-[#f2efeb] text-neutral-400 rounded-full text-sm mx-1'>Simple</p>
              </Marquee>
            </div>
          </div>
           <div className='bg-[#f0ece3] rounded-2xl font-secondary text-foreground tracking-tighter font-normal flex items-center overflow-hidden'>
            <div className='w-full'>
              <p className='pl-3 mb-1 font-medium'>Website</p>
               <Marquee autoFill={true} direction='left'>
                <p className='py-1 px-2 bg-gradient-to-b from-primary to-primary/70 text-white rounded-full text-sm mx-1'>Magnificent</p>
                <p className='py-1 px-2 bg-[#f2efeb] text-neutral-400 rounded-full text-sm mx-1'>Delightful</p>
                <p className='py-1 px-2 bg-[#f2efeb] text-neutral-400 rounded-full text-sm mx-1'>Beautiful</p>
              </Marquee>
            </div>
          </div>
        </div>
        <button className='rounded-2xl h-[15%] bg-gradient-to-b from-foreground to-foreground/70 text-white shadow-[0px_5px_11px_-7px_#ffffff] border-t-2 border-neutral-300/30 flex items-center justify-center font-secondary font-normal cursor-pointer gap-x-2'>
         <RocketLaunchIcon size={16} className='' weight='fill'/>
          Scan
        </button>
      </div>
    </div>
  )
}
