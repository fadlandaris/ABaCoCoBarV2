'use client'

import React from 'react'
import Btn from './reusable/btn'
import { navLinks } from '@/data/data'
import footerBg from "../../public/assets/footerbg.png"
import Image from 'next/image'
import { socmedData } from '@/data/data'
import { SignInIcon } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'


export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <footer className='sm:px-2  w-full'>
      <section className='bg-foreground text-white w-full rounded-t-3xl '>
        <div className='border-r-6 border-l-6 border-neutral-300/5 max-w-7xl mx-auto pt-32 h-[100vh] overflow-hidden flex flex-col justify-between relative overflow-hidden'>
          <div className='w-200 h-10 rounded-full bg-gradient-to-b from-[#7cbee0] via-[#fed849] to-[#f24f3f] absolute top-0 left-1/2 -translate-x-1/2 z-0 blur-2xl rotate-45'/>
          <div className='w-140 h-10 rounded-full bg-gradient-to-b from-[#7cbee0] via-[#fed849] to-[#f24f3f] absolute -top-12 left-1/2 -translate-x-1/2 z-0 blur-2xl -rotate-45'/>
          <div className=''>
            <div className='text-3xl sm:text-5xl font-medium tracking-tighter text-center px-12 sm:px-0'>
              <h1 className='relative'>Let&apos;s get in touch</h1>
              <h1 className='relative'>with ABaCoCoBAR</h1>
            </div>
            <div className='flex items-center justify-center mt-12 relative gap-x-6'>
              <Btn value={'Scan now'}/>
              <Btn value={'Contact us'} variant={true}/>
            </div>
          </div>
          <div className='sm:h-[200px] w-full grid grid-cols-1 sm:grid-cols-3 relative'>
            <Image src={footerBg} alt={''} fill className='object-cover object-contain'/>
            <div className='col-span-2 p-6 flex flex-col justify-between border-t-3 border-neutral-300/5 backdrop-blur-xl'>
            <div className='flex flex-col gap-y-3 items-start'>
               {navLinks.map((item, i) => {
                return (
                  <button key={i} onClick={()=> router.push(item.link)} className={`${pathname === item.link ? 'text-white' : 'text-neutral-400'} capitalize cursor-pointer hover:text-white transition-all duration-600`} >
                    {item.nav}
                  </button>
                )
              })}
            </div>
            <p className='text-sm text-neutral-400'>© ABaCoCoBar 2025</p>
            </div>
            <div className='border p-6 border-t-3 border-neutral-300/5 border-l-3 relative backdrop-blur-xl flex flex-col gap-y-4'>
              <div className='flex items-center justify-between'>
                <p>Stay in touch</p>
                <div className='flex items-center gap-x-3'>
                  {socmedData.map((item, i) => {
                    return (
                      <button key={i}>
                        <item.icon className='text-neutral-400' size={20}/>
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className='flex items-center justify-between p-0.5 border-neutral-700 rounded-xl bg-foreground border gap-x-1'>
                 <input type="text" placeholder='name@gmail.com' className='w-[75%] py-2 px-4 placeholder:font-medium rounded-xl focus:outline-none focus:ring-0' />
                 <button className='w-[25%] flex items-center justify-center gap-x-1 border border-neutral-700 py-2 px-4 rounded-xl bg-neutral-800 text-sm font-medium'>
                  <SignInIcon size={16}/>
                  Email
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
