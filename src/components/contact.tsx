'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'
import { contactData, picAbout } from '@/data/data'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import Btn from './reusable/btn'
import { motion } from 'framer-motion'
import Image from 'next/image'
import bacteriaImg from "../../public/assets/bacteria.png"

// 🧩 Definisikan tipe data contact item
interface ContactItem {
  id: number
  title: string
  link: string
  desc: string
  icon?: string
  pic?: { link: string }[] | string
  name?: string
}

// base class
const baseCard = 'w-90 h-90 flex flex-col justify-between'

// styling unik per id
const stylesById: Record<number, string> = {
  0: 'rounded-2xl overflow-hidden flex flex-col justify-between',
  1: 'overflow-hidden relative rounded-2xl',
  2: 'rounded-2xl overflow-hidden flex flex-col justify-between gap-y-6',
  3: 'bg-none',
}

// renderer unik per id
const renderersById: Record<number, (item: ContactItem) => React.ReactNode> = {
  0: (item) => (
    <>
      <motion.div className='w-full h-[75%] bg-cover bg-bottom relative p-6 shadow' style={{ backgroundImage: `url(${item.link})` }}
       initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
       whileInView={{ opacity: 1, scaleY: 1 }}
       transition={{ duration: 1.2, ease: 'easeOut', delay: 0.0,}}
       viewport={{ once: true, amount: 0.3 }}
      >
        <div className='absolute inset-0 bg-black/30'/>
         <motion.p className="p-2 border rounded-full inline-block text-sm tracking-tighter relative text-white"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} 
          viewport={{ once: true, amount: 0.3 }}
        >
          {item.desc}
        </motion.p>
      </motion.div>
      <motion.div className='w-full h-[25%] flex items-center justify-between p-6 bg-black text-white shadow'
       initial={{ opacity: 0, scaleY: 0, transformOrigin: 'bottom' }}
       whileInView={{ opacity: 1, scaleY: 1 }}
       transition={{ duration: 1.2, ease: 'easeOut', delay: 0.0,}}
       viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h1 className="text-2xl tracking-tighter w-[70%] font-semibold"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }} 
          viewport={{ once: true, amount: 0.3 }}
        >{item.title}</motion.h1>
        <div className="p-2 rounded-full bg-primary text-black">
          <ArrowUpRightIcon />
        </div>
      </motion.div>
    </>
  ),
  1: (item) => (
    <motion.div className="w-full h-full p-6 rounded-2xl bg-fourth relative shadow"
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.0 }}
    viewport={{ once: true, amount: 0.3 }}
    >
    <motion.div className='absolute -bottom-38 -right-38'
    initial={{ opacity: 0, x: 0, }}
    whileInView={{ opacity: 1, x: 1 }}
    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3,}}
    viewport={{ once: true, amount: 0.3 }}
    >
      <Image className='' src={bacteriaImg} alt={''} width={400} height={400}/>
    </motion.div>
    <div className="flex items-start justify-between relative">
      <motion.h1 className="text-2xl tracking-tighter font-medium w-[70%]"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} 
      viewport={{ once: true, amount: 0.3 }}
      >
        {item.title}
      </motion.h1>
      <div className="p-2 rounded-full bg-primary text-black">
        <ArrowUpRightIcon />
      </div>
    </div>
  </motion.div>
  ),
  2: (item) => (
    <>
      <motion.div className="w-full h-[25%] rounded-b-2xl overflow-hidden bg-primary p-6 flex items-center gap-x-3 shadow"
        initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.0,}}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="w-9 h-9 rounded-full bg-cover bg-center shadow" 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} 
          viewport={{ once: true, amount: 0.3 }}
          style={{ backgroundImage: 'url(/assets/yolo.png)' }}
        />
        <div className="text-sm tracking-tighter">
          <motion.p className="font-semibold text-black"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }} 
            viewport={{ once: true, amount: 0.3 }}
          >{item.name}</motion.p>
          <motion.p className="text-black/50"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.9 }} 
            viewport={{ once: true, amount: 0.3 }}
          >{item.desc}</motion.p>
        </div>
      </motion.div>
      <motion.div className="w-full h-[75%] bg-neutral-400 rounded-2xl flex flex-col justify-end p-6 bg-cover bg-center relative overflow-hidden shadow" style={{ backgroundImage: `url(${item.link})` }}
        initial={{ opacity: 0, scaleY: 0, transformOrigin: 'bottom' }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.0,}}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="bg-black/50 inset-0 absolute" />
        <div className="text-white relative">
          <motion.div className="p-2 rounded-full border border-white inline-block mb-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} 
            viewport={{ once: true, amount: 0.3 }}
          >
            <ArrowUpRightIcon />
          </motion.div>
          <motion.h1 className="text-2xl tracking-tighter font-semibold w-[75%] relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }} 
            viewport={{ once: true, amount: 0.3 }} 
          >
            {item.title}
          </motion.h1>
        </div>
      </motion.div>
    </>
  ),
  3: (item) => (
    <motion.div className='bg-tertiary rounded-2xl overflow-hidden flex flex-col justify-between p-6 w-full h-full shadow'
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.0 }}
    viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex items-center justify-end">
        <motion.p className="p-2 border rounded-full inline-block text-sm tracking-tighter"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} 
          viewport={{ once: true, amount: 0.3 }} 
        >
          {item.desc}
        </motion.p>
      </div>
      <div>
        <motion.div className="flex items-center mb-3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }} 
          viewport={{ once: true, amount: 0.3 }} 
        >
          {Array.isArray(picAbout) &&
            picAbout.map((pic, i) => (
              <div
                key={i}
                className={`${pic.id === 0 ? '' : '-ml-2'} w-9 h-9 rounded-full bg-cover bg-center`}
                style={{ backgroundImage: `url(${pic.link})` }}
              />
            ))}
        </motion.div>
        <motion.h1 className="text-2xl tracking-tighter font-medium mb-3 w-[70%]"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.8 }} 
          viewport={{ once: true, amount: 0.3 }} 
        >
          {item.title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.9 }} 
          viewport={{ once: true, amount: 0.3 }} 
        >
          <Btn value={'Scan Now'} />
        </motion.div>
      </div>
    </motion.div>
  ),
}

export default function Contact() {
  return (
    <section id="contact" className="w-full h-full pt-32 pb-24">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex justify-between items-start px-12">
          <motion.h1 className="text-6xl font-semibold text-secondary tracking-tighter"
          initial={{ opacity: 0, y: 50, }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.0 }}
          viewport={{ once: true, amount: 0.3 }}
          >
            Let&apos;s get in touch
          </motion.h1>
          <p className="text-right w-1/4 tracking-tighter text-secondary">
            <motion.span
            initial={{ opacity: 0, y: 50, }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            >Have questions or need assistance?</motion.span> 
            <motion.span
            initial={{ opacity: 0, y: 50, }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            > We’d love to hear from you.</motion.span> 
            <motion.span
            initial={{ opacity: 0, y: 50, }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.9 }}
            viewport={{ once: true, amount: 0.3 }}
            >Reach out to us for collaborations,</motion.span>   
            <motion.span
            initial={{ opacity: 0, y: 50, }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
            >feedback, or any inquiries.</motion.span>
          </p>
        </div>

        <div className="w-full h-[380px] mt-10">
          <Marquee
            className="w-full h-full cursor-pointer scrollbar-none"
            pauseOnHover
            autoFill={true}
            speed={30}
          >
            {contactData.map((item) => {
              const cardClass = stylesById[item.id] || 'bg-white'
              const render = renderersById[item.id]
              // const delay = [0, 0.2, 0.4, 0.6]
              return (
                <div key={item.id} className="mx-3">
                  <article className={`${baseCard} ${cardClass}`}>
                    {render ? (
                      render(item)
                    ) : (
                      <>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        {item.desc && (
                          <p className="mt-auto text-sm opacity-70">
                            {item.desc}
                          </p>
                        )}
                      </>
                    )}
                  </article>
                </div>
              )
            })}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
