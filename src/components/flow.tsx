'use client'

import React from 'react'
import { howItWorks } from '@/data/data'
import { motion } from "framer-motion";

export default function Flow() {
  return (
    <section id='flow' className='w-full h-full p-12 pt-32 pb-24'>
      <div className='w-full h-full flex flex-col justify-between'>
        <div className='flex items-end justify-between'>
          <motion.h1 className='text-6xl font-semibold text-secondary tracking-tighter'
          initial={{ opacity: 0, y: 50, }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.0 }}
          viewport={{ once: true, amount: 0.3 }}
          >How it works?</motion.h1>
          <motion.button className="relative px-6 py-3 text-black cursor-pointer group tracking-tighter"
          initial={{ opacity: 0, y: 50, }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          >
          <span className="relative z-10 text-primary">Simple as that</span>

          {/* Animated stroke blob */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 200 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <motion.path
              d="M25 35 C20 10, 175 0, 185 25 C170 60, 35 65, 25 35 Z"
              stroke="#dee5fb"
              strokeWidth="3"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                d: [
                  "M25 35 C20 10, 175 0, 185 25 C170 60, 35 65, 25 35 Z",
                  "M22 32 C28 5, 170 12, 182 28 C175 58, 38 62, 22 32 Z",
                  "M27 33 C18 8, 180 4, 187 27 C172 63, 33 66, 27 33 Z",
                  "M25 35 C20 10, 175 0, 185 25 C170 60, 35 65, 25 35 Z"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>
        </motion.button>
        </div>
        <div className='grid grid-cols-4 gap-x-6 h-[70%]'>
          {howItWorks.map((item, i) => {
            const delay = [
              0,
              0.3,
              0.6,
              0.9,
            ]
            return (
              <motion.div key={i} className='rounded-2xl relative flex flex-col justify-between p-6 bg-neutral-400 text-white bg-cover bg-center'
                initial={{ opacity: 0, scaleY: 0, transformOrigin: 'bottom' }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: delay[item.id] }}  
                viewport={{ once: true, amount: 0.3 }}
                style={{ backgroundImage: `url(${item.link})` }}
              >
                <div className='absolute bg-black/30 inset-0 rounded-2xl'/>
                <motion.p className='text-2xl font-semibold tracking-tighter relative'
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: 'easeOut', delay: delay[item.id] }} 
                  viewport={{ once: true, amount: 0.3 }}
                >0{item.id + 1}</motion.p>
                <motion.p className='text-2xl tracking-tighter relative font-medium'
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: 'easeOut', delay: delay[item.id] }}  
                  viewport={{ once: true, amount: 0.3 }}
                >{item.desc}</motion.p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
