'use client'

import React from 'react'
import Btn from './reusable/btn'
import { navLinks } from '@/data/data'
import footerBg from "../../public/assets/footerbg.png"
import cloudBg from "../../public/assets/cloud.png"
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='px-2 pb-2 w-full'>
      <section className='bg-foreground text-white w-full rounded-3xl '>
        <div className='border-r-6 border-l-6 border-neutral-300/5 max-w-7xl mx-auto pt-32 h-[100vh] flex flex-col justify-between'>
          <div className='border'>
            <div className='text-5xl font-medium tracking-tighter text-center'>
              <h1>Your comprehensive gateway</h1>
              <h1>to Bitcoin dapps and tools</h1>
            </div>
            <div className='flex items-center justify-center mt-12'>
              <Btn value={'Scan now'}/>
            </div>
          </div>
          <div className='h-[200px] w-full grid grid-cols-3 relative'>
            <Image src={footerBg} alt={''} fill className='object-cover object-contain'/>
            <div className=' col-span-2 p-6 flex flex-col gap-y-3 border-t-3 border-neutral-300/5'>
              {navLinks.map((item, i) => {
                return (
                  <div key={i} className='capitalize'>
                    {item.nav}
                  </div>
                )
              })}
            </div>
            <div className='border p-6 border-t-3 border-neutral-300/5 border-l-3 relative bg-'>
              test
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
