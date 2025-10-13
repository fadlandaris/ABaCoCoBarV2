'use client'

import React from 'react'
import Btn from './reusable/btn'
import { motion } from 'framer-motion'

export default function Hero() {
  const heroURL =
    'https://images.unsplash.com/photo-1614308460927-5024ba2e1dcb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'

  return (
    <section
      className="w-full h-full relative bg-cover bg-right p-12 overflow-hidden"
      style={{ backgroundImage: `url(${heroURL})` }}
     >
      <div className="absolute inset-0 bg-black/60 z-20" />
      <div className="relative w-full h-full flex flex-col justify-end text-white z-30">
        <div className="flex justify-between">
          <div>
            <div className="text-6xl font-medium tracking-tighter">
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.0 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Automated Bacterial
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Colony Counter
              </motion.h1>
            </div>

            <motion.p
              className="w-[40%] my-6 tracking-tight text-neutral-200"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Say goodbye to manual counting. Our AI-powered platform detects and counts bacterial colonies instantly — making research faster, smarter, and more efficient than ever
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.9 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Btn value="Get Started" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
