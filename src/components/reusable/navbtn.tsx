'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { SignedIn, SignedOut, SignInButton, useClerk, UserButton } from "@clerk/nextjs"
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@phosphor-icons/react'


export default function Navbtn() {
  const { isSignedIn} = useClerk()
  const router = useRouter()

  return (
      <motion.div className={`${isSignedIn ? 'gap-x-2' : ''} bg-gradient-to-l from-black/5 via-black/5 to-black/30 flex items-center rounded-full text-sm backdrop-blur-sm tracking-tighter`}
        initial={{ opacity: 0, x: 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <SignedOut>
          <SignInButton mode="modal" >
            <motion.button className='p-3 pl-5 cursor-pointer'
              initial={{ opacity: 0, scaleX: 0, transformOrigin: 'right' }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.0 }}  
              viewport={{ once: true, amount: 0.3 }}
            >
              Login
            </motion.button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton/>
        </SignedIn>
        <motion.button onClick={()=> router.push('scan')}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.0 }}
          viewport={{ once: true, amount: 0.3 }}
          className='bg-primary text-secondary flex items-center gap-x-2 rounded-full py-3 px-6 text-sm tracking-tighter overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-500`'
        >
          <div className='relative overflow-hidden'>
            <p className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'>Scan Now</p>
            <p className='opacity-0'>Scan Now</p>
            <p className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'>Scan Now</p>
          </div>
          <div>
            <div className='relative overflow-hidden -rotate-45'>
              <ArrowRightIcon className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'/>
              <ArrowRightIcon className='opacity-0'/>
              <ArrowRightIcon className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'/>
            </div>
          </div>
        </motion.button>
      </motion.div>
  )
}
