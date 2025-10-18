'use client'

import React from 'react'
import profilePic from "../../../public/assets/profile.png"
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hasslecard() {
  return (
    <div>
      <div className='w-40 h-40 absolute bg-[#fcf8ef] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 blur-2xl'/>
      <motion.div className='inline-block text-sm py-2 px-4 bg-[#fcf8ef] text-neutral-500 rounded-tl-full rounded-tr-full rounded-br-full absolute top-1/7 -translate-y-1/2 -right-1/9 z-10 shadow-[0px_0px_4px_0px_#fcf8ef]'
      initial={{ y: 0 }}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut',}}
      >
        Enjoy ABaCoCoBar
      </motion.div>
      <Image src={profilePic} alt={''} width={300} className='border-b-2 rounded-b-full border-neutral-700 relative'/>
    </div>
  )
}
