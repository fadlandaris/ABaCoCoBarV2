'use client'

import React from 'react'
import Btn from './reusable/btn'
import { aboutData, aboutPlusData } from '@/data/data'
import Image from 'next/image'
import cloudBg from "../../public/assets/cloud.png"
import { motion } from 'framer-motion'

export default function About() {
  return (
    <main className='w-full px-2'>
      <motion.section className='bg-foreground text-white w-full rounded-3xl'>
        <div className='border-r-6 border-l-6 border-neutral-300/5 max-w-7xl mx-auto py-32 px-6'>
          <div className='flex items-center justify-between mb-24'>
            <div className='text-5xl font-medium tracking-tighter'>
              <h1>Your ultimate Bacteria Scanner</h1>
              <h1>packed with features to</h1>
              <h1>simplify scanning process</h1>
            </div>
            <div className='w-1/3'>
              <p className='mb-6 text-[18px] text-neutral-400'>Say goodbye to manual counting. Our platform detects and counts bacterial colonies instantly — making research faster, and more efficient than ever</p>
              <div>
                <Btn value={'Contact us'} variant={true}/>
              </div>
            </div>
          </div>
          <div className='border w-full border-6 border-neutral-300/5 rounded-[53px]'>
            <div className='border w-full rounded-[50px] p-[5px] border-neutral-800'>
              <div className='w-full grid grid-cols-2 gap-2'>
                {aboutData.map((item, i) => {
                  return (
                    <div key={i} className='border rounded-[48px] border-neutral-800 overflow-hidden'>
                      <div className='w-full h-[42vh] relative '>
                        <div className='flex items-center justify-center gap-x-12 absolute top-1/2 -translate-1/2 left-1/2 -translate-x-1/2 z-0'>
                          <div className={`w-40 h-15 rounded-full blur-3xl`} style={{ backgroundColor: item.color }}/>
                          <div className={`w-40 h-15 rounded-full blur-3xl`} style={{ backgroundColor: item.color }}/>
                        </div>
                        <Image src={cloudBg} alt={''} fill className='object-cover object-contain z-10'/>
                        <div className='absolute top-1/2 -translate-1/2 left-1/2 -translate-x-1/2 z-20'>
                          <Image src={item.image} alt={''} width={230} className={`${item.id === 1 ? 'rotate-32' : 'rotate-0'}`}/>
                        </div>
                      </div>
                      <div className='font-medium tracking-tighter p-9'>
                        <item.icon size={30} weight='regular'/>
                        <h1 className='mt-4 mb-3 text-2xl'>{item.title}</h1>
                        <p className='text-[18px] text-neutral-400 w-[70%]'>{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='mt-48'>
            <div className='text-center text-5xl font-medium relative tracking-tighter'>
              <div className='w-40 h-20 rounded-full bg-gradient-to-b from-[#7cbee0] via-[#fed849] to-[#f24f3f] absolute -bottom-8 left-1/2 -translate-x-1/2 z-0 blur-3xl'/>
              <h1 className='relative'>Explore, create, and trade</h1>
              <h1 className='relative'>Seemlessly <span className='text-neutral-400'>in the bitcoin</span></h1>
              <h1 className='text-neutral-400 relative'>ecosystem.</h1>
            </div>
            <div className='mt-24 grid grid-cols-3'>
              {aboutPlusData.map((item, i) => {
                const rotate = [
                  "rotate-2 z-0",
                  "-rotate-2 z-10",
                  "rotate-2 z-20",
                ]
                return (
                  <div key={i} className={`${rotate[item.id]} border border-neutral-800 rounded-3xl p-8 bg-gradient-to-r from-neutral-900 to-foreground relative`}>
                    <div className='flex items-center'>
                      {item.image.map((items, i) => {
                        return (
                          <div key={i} className={`${rotate[items.id]} w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-3xl`}/>
                        )
                      })}
                    </div>
                    <h1 className='text-xl w-[70%] font-medium mt-12'>{item.desc}</h1>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
