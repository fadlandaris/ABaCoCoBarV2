'use client'

import React from 'react'
import { serviceData } from '@/data/data'
import cloudBg from "../../public/assets/cloud.png"
import Image from 'next/image'

export default function Services() {
  return (
    <section className="border-r-6 border-l-6 border-neutral-300/20 max-w-7xl mx-auto text-foreground relative overflow-hidden py-32 px-6">
      <div className="flex flex-col gap-y-24">
        {serviceData.map((item, i) => (
          <div key={i} className={`flex w-full h-[60vh] items-center ${i === 1 ? 'flex-row-reverse' : '' }`}>
            <div className={`w-1/2 ${item.id === 1 ? 'pl-24' : ''}`}>
              <div className="text-5xl font-medium tracking-tighter">
                <h1 className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 via-neutral-600 to-foreground'>{item.title}</h1>
                <h1>{item.title2}</h1>
              </div>
              <p className="text-neutral-500 text-[18px] w-[70%] mt-8 font-medium">{item.desc}</p>
              <div className='mt-8 inline-block p-3 px-5 rounded-xl bg-[#f2efeb]'>
                <div className='flex items-center gap-x-1 text-neutral-500'>
                  <item.icon weight='fill' size={20}/>
                  <p>{item.title}</p>
                  <p>{item.title2}</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 rounded-2xl overflow-hidden relative bg-foreground/95 border h-full">
              <Image src={cloudBg} alt="" fill className="object-cover object-contain z-0"/>
              <div className='absolute text-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
                <item.components/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
