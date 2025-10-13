'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'
import Btn from './reusable/btn'
import { ArrowRightIcon, AsteriskIcon } from '@phosphor-icons/react'
import { picAbout } from '@/data/data'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id='about' className='w-full h-full p-12 pt-28 pb-24'>
      <div className='w-full h-full flex flex-col justify-between'>
        <div className=''>
          <div className='flex justify-center items-center mb-10'>
            <p className='font-semibold px-5 py-1 rounded-full bg-neutral-200 text-[#2d3400] tracking-tighter'>Join Over 100+ Users already using ABaCoCoBar</p>
          </div>
          <Marquee className='scrollbar-none' autoFill={true}>
            <div className='flex items-center gap-x-5 mx-3 text-2xl font-light tracking-tighter text-neutral-200'>
              <AsteriskIcon weight='regular'/>
              <p>ABaCoCoBar</p>
            </div>
          </Marquee>
        </div>
        <div className='grid grid-cols-3'>
          <div>
          <div className='text-6xl font-semibold text-secondary tracking-tighter'>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.0 }}   // baris 1
              viewport={{ once: true, amount: 0.3 }}
            >Build For Your Next 
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}   // baris 1
              viewport={{ once: true, amount: 0.3 }}
            >Gen Of Scanner 
            </motion.h1>
          </div>
          <motion.div className='flex items-center gap-x-4 my-10'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}   // baris 1
            viewport={{ once: true, amount: 0.3 }}
          >
            <Btn value={'Get Started'}/>
            <Btn value={'Learn More'} variant={true}/>
          </motion.div>
          <div className='tracking-tighter'>
            <motion.p className='text-neutral-400 font-medium'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}   // baris 1
              viewport={{ once: true, amount: 0.3 }}
            ><span className='font-bold text-secondary'>Experience Seamless Scanning Process</span> Upload your bacteria colony image and let our smart detection system automatically analyze and count colonies with precision — all in seconds.</motion.p>
            <motion.p className='text-neutral-400 font-medium mt-2'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1.2 }}   // baris 1
              viewport={{ once: true, amount: 0.3 }}
            ><span className='font-bold text-secondary'>Fast Response Time</span>  Enjoy a quick scanning process — the analysis and annotation are completed in an average of 7–10 seconds</motion.p>
          </div>
          </div>
          <div className='col-span-2 flex justify-end gap-x-6 items-end'>
            <motion.div className='rounded-2xl p-6 w-96 bg-tertiary flex flex-col justify-between'
              initial={{ opacity: 0, y: 50, height: 0 }}
              whileInView={{ opacity: 1, y: 0, height: '70%' }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.0 }}   // baris 1
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className='text-2xl font-semibold tracking-tighter'>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}   // baris 1
                  viewport={{ once: true, amount: 0.3 }}
                >Scan Anywhere and</motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}   // baris 1
                  viewport={{ once: true, amount: 0.3 }}
                >Anytime Effortlesly</motion.p>
              </div>
              <div>
                <motion.div className='flex items-center gap-x-2 '
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}   // baris 1
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <ArrowRightIcon size={14} weight='thin' className='text-neutral-400'/>
                  <p className='text-sm text-secondary tracking-tighter'>Free cost and easy flow</p>
                </motion.div>
                <motion.div className='flex items-center gap-x-2 mb-6 mt-1'
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}   // baris 1
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <ArrowRightIcon size={14} weight='thin' className='text-neutral-400'/>
                  <p className='text-sm text-secondary tracking-tighter'>integrated with train model of YOLOv11</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}   // baris 1
                  viewport={{ once: true, amount: 0.3 }}
                >
                   <Btn value={'Manage expenses'}/>
                </motion.div>
              </div>
            </motion.div>
            <motion.div className=' w-80 rounded-2xl relative flex flex-col justify-end p-6 bg-black overflow-hidden'
              initial={{ opacity: 0, y: 50, height: 0 }}
              whileInView={{ opacity: 1, y: 0, height: '90%' }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.0 }}   // baris 1
              viewport={{ once: true, amount: 0.3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width={250}
                height={250}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className='absolute -top-12 -left-24 text-neutral-700'
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
              {/* <FlowerIcon size={200} weight='thin' /> */}
              <motion.div className='bg-[#acb18c] absolute text-white top-12 p-3 rounded-2xl w-36'
                initial={{ opacity: 0, x: 100, width: '100px' }}
                whileInView={{ opacity: 1, x: 0, width: '144px' }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}   // baris 1
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className='py-1 px-2 tracking-tighter text-[10px] rounded-full bg-white text-black font-semibold mb-2 inline-block'>Our Partners</p>
                <div className='flex items-center'>
                  {picAbout.map((item, i) => {
                    return (
                      <div key={i} className={`${item.id === 0 ? '' : '-ml-2'} w-8 h-8 rounded-full bg-cover bg-center`} style={{ backgroundImage: `url(${item.link})` }}/>
                    )
                  })}
                </div>
              </motion.div>
              <motion.div className='border border-primary absolute text-white top-18 -right-4 p-3 rounded-2xl'
                initial={{ opacity: 0, x: 50, width: '100px' }}
                whileInView={{ opacity: 1, x: 0, width: '155px' }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.6 }}   // baris 1
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className='py-1 px-2 tracking-tighter rounded-full bg-primary text-[10px] text-black font-semibold mb-2 inline-block'>Bacteria Scanner</p>
                <div className='flex items-center'>
                  {picAbout.map((item, i) => {
                    return (
                      <div key={i} className={`${item.id === 0 ? '' : '-ml-2'} w-8 h-8 rounded-full bg-cover bg-center`} style={{ backgroundImage: `url(${item.link})` }}/>
                    )
                  })}
                </div>
              </motion.div>
              <div className='text-primary text-2xl font-medium tracking-tighter'>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}   // baris 1
                  viewport={{ once: true, amount: 0.15, margin: '-10% 0px' }}
                >
                  Fasten Your Process
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}   // baris 1
                  viewport={{ once: true, amount: 0.15, margin: '-10% 0px' }}
                >
                  With ABaCoCoBar
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
