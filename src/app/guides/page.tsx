'use client'

import React from 'react'
import Guide from '@/components/guide'
import Footer from '@/components/footer'
import gridBG from "../../../public/assets/grid.png"
import Image from 'next/image'
import Btn from '@/components/reusable/btn'

export default function GuidePage() {
  return (
    <main className=''>
      <div className="max-w-7xl mx-auto h-[30vh] relative border-r-6 border-l-6 border-neutral-300/20 flex items-end justify-center pb-6">
        <Image src={gridBG} className="object-cover object-contain" fill  alt={""} />
        <div className='z-30'>
          <Btn value={'Scan Now'}/>
        </div>
      </div>
      <Guide/>
      <Footer/>
    </main>
  )
}
