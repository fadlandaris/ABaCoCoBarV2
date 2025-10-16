'use client'

import React from 'react'
import Btn from './reusable/btn'
import Marquee from 'react-fast-marquee'
import { motion } from 'framer-motion'

export default function Services() {
  const personSmiling = 'https://images.unsplash.com/photo-1714273709972-f5b3606bf227?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
  
  return (
    <section id='services' className='w-full h-full p-12 pb-24 pt-32'>
      <div className='w-full h-full flex flex-col justify-between'>
        <div className='flex justify-between items-center'>
          <motion.h1 className='text-6xl font-semibold text-secondary tracking-tighter'
          initial={{ opacity: 0, y: 50, }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.0 }}
          viewport={{ once: true, amount: 0.3 }}
          >Acces the growth capital you need, fast</motion.h1>
          <motion.div
          initial={{ opacity: 0, y: 50, }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          >
            <Btn value={'Learn More'} variant={true}/>
          </motion.div>
        </div>
        <div className='grid grid-cols-4 gap-x-6 h-[70%]'>
          <motion.div className='rounded-2xl bg-primary p-12 tracking-tighter'
            initial={{ opacity: 0, scaleY: 0, transformOrigin: 'bottom' }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.0 }}   // baris 1
            viewport={{ once: true, amount: 0.3 }}
           >
            <motion.div className='bg-white h-full rounded-2xl flex flex-col justify-between'
              initial={{ opacity: 0, y: 0, height: 0 }}
              whileInView={{ opacity: 1, y: 0, height: '100%' }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}   // baris 1
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h1 className='font-bold text-secondary text-xl px-6 pt-6'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.0 }}   // baris 1
                viewport={{ once: true, amount: 0.3 }}
              >PDF Friendly Report</motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}   // baris 1
                viewport={{ once: true, amount: 0.3 }}
              >
                <Marquee autoFill={true} direction='left' className='mb-2'>
                  <p className='py-1 px-2 bg-secondary text-white rounded-full text-sm mx-1'>Colony Scanner</p>
                  <p className='py-1 px-2 bg-primary text-secondary rounded-full text-sm mx-1'>bacteria Scanner</p>
                  <p className='py-1 px-2 bg-[#dee5fb] text-secondary rounded-full text-sm mx-1'>ABaCoCoBar</p>
                </Marquee>
                <Marquee autoFill={true} direction='right'>
                  <p className='py-1 px-2 bg-primary text-secondary rounded-full text-sm mx-1'>bacteria Scanner</p>
                  <p className='py-1 px-2 bg-[#dee5fb] text-secondary rounded-full text-sm mx-1'>ABaCoCoBar</p>
                  <p className='py-1 px-2 bg-secondary text-white rounded-full text-sm mx-1'>Colony Scanner</p>
                </Marquee>
              </motion.div>
              <motion.p className='text-sm text-neutral-400 font-medium px-6 pb-6'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}   // baris 1
                viewport={{ once: true, amount: 0.3 }}
              >After completing the analysis, you can easily download a detailed report in PDF format</motion.p>
            </motion.div>
          </motion.div>
          <motion.div className='p-6 rounded-2xl bg-[#dee5fb] flex flex-col justify-between relative overflow-hidden'
            initial={{ opacity: 0, scaleY: 0, transformOrigin: 'bottom' }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.7, ease: 'easeOut', delay: 0.0 }}  
            viewport={{ once: true, amount: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width={200}
              height={200}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className='absolute -top-12 -right-30 text-primary'
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
            <div className='text-4xl font-semibold tracking-tighter text-secondary'>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}   // baris 1
                viewport={{ once: true, amount: 0.3 }}
              >Intuitive</motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.9 }}   // baris 1
                viewport={{ once: true, amount: 0.3 }}
              >Performance.</motion.h1>
            </div>
            <motion.div className='rounded-2xl bg-white p-4 text-secondary tracking-tighter'
              initial={{ opacity: 0, scaleX: 0, transformOrigin: 'right' }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.0 }}   // baris 1
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p className='font-semibold text-sm mb-2'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}   // baris 1
                viewport={{ once: true, amount: 0.3 }}
              >Scan Accuracy</motion.p>
              <div className='flex items-end gap-x-2 mb-6'>
                <motion.p className='text-4xl font-bold'
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}   // baris 1
                  viewport={{ once: true, amount: 0.3 }}
                >85.5%</motion.p>
                <motion.p className='text-sm font-semibold'
                 initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 1.2 }}   // baris 1
                  viewport={{ once: true, amount: 0.3 }}
                >w YOLOv11</motion.p>
              </div>
              <div className='flex items-center'>
                <motion.div className='w-[85%] h-4 bg-primary'
                  initial={{ opacity: 0, scaleX: 0, transformOrigin: 'left' }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}   // baris 1
                  viewport={{ once: true, amount: 0.3 }}
                />
                <motion.div className='w-[15%] h-4 bg-neutral-400'
                  initial={{ opacity: 0, scaleX: 0, transformOrigin: 'right' }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 2, ease: 'easeOut', delay: 0.6 }}   // baris 1
                  viewport={{ once: true, amount: 0.3 }}
                />
              </div>
            </motion.div>
          </motion.div>
          <motion.div className='col-span-2 rounded-2xl flex flex-col justify-between bg-center bg-cover p-6 text-white relative overflow-hidden'
            initial={{ opacity: 0, scaleY: 0, transformOrigin: 'bottom' }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.0 }}   // baris 1
            viewport={{ once: true, amount: 0.3 }}
            style={{ backgroundImage: `url(${personSmiling})` }}
           >
            <div className='absolute inset-0 bg-black/30'/>
            <motion.h1 className='text-4xl font-semibold tracking-tighter relative'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}   // baris 1
              viewport={{ once: true, amount: 0.3 }}
            >Hassle- Free Cap</motion.h1>
            <motion.p className='text-2xl tracking-tighter relative'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}   // baris 1
              viewport={{ once: true, amount: 0.3 }}
            >Experience a simple and effortless way to analyze and count bacterial colonies. Our automated system makes the process fast, accurate, and completely hassle-free</motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
