'use client'

import React from 'react'
import { picAbout, socialMediaData } from '@/data/data'
import { Navlinks } from '@/data/data'
import Btn from './reusable/btn'

export default function Footer() {
  
  return (
    <footer className='w-full h-full p-12 pt-28 bg-gradient-to-b from-[#fbf9f5] via-[#f2fab8]/50 to-[#d1df5a]/50'>
      <div className=' w-full h-full flex flex-col justify-between'>
        {/* card black  */}
        <div className='w-full h-full rounded-2xl p-6 bg-black text-white grid grid-cols-2 gap-x-16 relative overflow-hidden'>
           <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width={300}
            height={300}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className='absolute -bottom-24 left-24  text-neutral-700'
          >
            <circle cx="50" cy="50" r="5" fill="currentColor" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <ellipse
                key={angle}
                cx="50"
                cy="25"
                rx="8"
                ry="20"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width={300}
            height={300}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className='absolute -top-24 right-24  text-neutral-700'
          >
            <circle cx="50" cy="50" r="5" fill="currentColor" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <ellipse
                key={angle}
                cx="50"
                cy="25"
                rx="8"
                ry="20"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
          </svg>
          <div className='flex flex-col justify-between relative'>
            <div>
              <h1>logo</h1>
              <p className='text-sm tracking-tighter w-1/2 text-[#d1df5a] mt-6 mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo consequatur magni animi nostrum inventore est.</p>
              <div className='flex items-center gap-x-2'>
                <div className='w-1 h-2 bg-[#d1df5a] rounded-full'/>
                <p className='text-sm tracking-tighter text-[#d1df5a] capitalize'>more about us</p>
              </div>
            </div>
            <div className='flex items-end justify-between'>
              <div className='grid grid-cols-2 gap-2'>
                {socialMediaData.map((item, i) => {
                  return (
                    <div key={i} className='p-2 rounded-full bg-white text-[#2f3501]'>
                      <item.icon weight='fill'/>
                    </div>
                  )
                })}
              </div>
              <p className='w-1/4 text-right text-sm tracking-tighter text-[#d1df5a]'>© 2025 - ABaCoCoBar Copyrights All Right Reserved</p>
            </div>
          </div>
          <div className='flex flex-col justify-between relative'>
            <div className='flex items-center gap-x-6'>
              {Navlinks.map((item, i) => {
                return (
                  <button key={i} className='text-sm tracking-tighter text-[#d1df5a]'>
                    {item.nav}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
