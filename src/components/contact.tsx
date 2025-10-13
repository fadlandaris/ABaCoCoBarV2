'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'
import { contactData, picAbout } from '@/data/data'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import Btn from './reusable/btn'
import { motion } from 'framer-motion'

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
  0: 'bg-gradient-to-b from-none via-black to-black flex flex-col justify-between text-white rounded-2xl overflow-hidden',
  1: 'bg-fourth rounded-2xl overflow-hidden p-6 relative',
  2: 'rounded-2xl overflow-hidden flex flex-col justify-between gap-y-6',
  3: 'bg-tertiary rounded-2xl overflow-hidden flex flex-col justify-between p-6',
}

// renderer unik per id
const renderersById: Record<number, (item: ContactItem) => React.ReactNode> = {
  0: (item) => (
    <>
      <div
        className="w-full h-[75%] rounded-b-2xl overflow-hidden bg-neutral-400 p-6 bg-cover bg-bottom relative"
        style={{ backgroundImage: `url(${item.link})` }}
      >
        <div className="bg-black/50 inset-0 absolute" />
        <p className="p-2 border rounded-full inline-block text-sm tracking-tighter relative">
          {item.desc}
        </p>
      </div>
      <div className="w-full h-[25%] rounded-2xl flex items-center justify-between px-6">
        <p className="text-2xl tracking-tighter w-1/2">{item.title}</p>
        <div className="p-2 rounded-full bg-primary text-black">
          <ArrowUpRightIcon />
        </div>
      </div>
    </>
  ),

  1: (item) => (
    <>
      <div className="flex items-start justify-between">
        <h1 className="text-2xl tracking-tighter font-semibold w-[70%] ">
          {item.title}
        </h1>
        <div className="p-2 rounded-full bg-primary text-black">
          <ArrowUpRightIcon />
        </div>
      </div>
    </>
  ),

  2: (item) => (
    <>
      <div className="w-full h-[25%] rounded-b-2xl overflow-hidden bg-primary p-6 flex items-center gap-x-3">
        <div className="w-9 h-9 rounded-full bg-neutral-400" />
        <div className="text-sm tracking-tighter">
          <p className="font-semibold text-black">{item.name}</p>
          <p className="text-black/50">{item.desc}</p>
        </div>
      </div>
      <div
        className="w-full h-[75%] bg-neutral-400 rounded-2xl flex flex-col justify-end p-6 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${item.link})` }}
      >
        <div className="bg-black/50 inset-0 absolute" />
        <div className="text-white relative">
          <div className="p-2 rounded-full border border-white inline-block mb-3">
            <ArrowUpRightIcon />
          </div>
          <h1 className="text-2xl tracking-tighter font-medium w-[75%] relative">
            {item.title}
          </h1>
        </div>
      </div>
    </>
  ),

  3: (item) => (
    <>
      <div className="flex items-center justify-end">
        <p className="p-2 border rounded-full inline-block text-sm tracking-tighter">
          {item.desc}
        </p>
      </div>
      <div>
        <div className="flex items-center">
          {Array.isArray(picAbout) &&
            picAbout.map((pic, i) => (
              <div
                key={i}
                className={`${pic.id === 0 ? '' : '-ml-2'} w-9 h-9 rounded-full bg-cover bg-center`}
                style={{ backgroundImage: `url(${pic.link})` }}
              />
            ))}
        </div>
        <p className="text-black/50 tracking-tighter mt-3 text-sm">#ABaCoCoBar</p>
        <h1 className="text-2xl tracking-tighter font-semibold mb-3 w-[70%]">
          {item.title}
        </h1>
        <Btn value={'Scan Now'} />
      </div>
    </>
  ),
}

export default function Contact() {
  return (
    <section id="contact" className="w-full h-full pt-32 pb-24">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex justify-between items-start px-12">
          <h1 className="text-6xl font-semibold text-secondary tracking-tighter">
            Let&apos;s get in touch
          </h1>
          <p className="text-right w-1/4 tracking-tighter text-secondary">
            Have questions or need assistance? We’d love to hear from you. Reach
            out to us for collaborations, feedback, or any inquiries.
          </p>
        </div>

        <div className="w-full h-[380px] mt-10">
          <Marquee
            className="w-full h-full cursor-pointer"
            pauseOnHover
            speed={50}
            autoFill
          >
            {contactData.map((item) => {
              const cardClass = stylesById[item.id] || 'bg-white'
              const render = renderersById[item.id]
              const delay = [0, 0.2, 0.4, 0.6]

              return (
                <motion.div
                  key={item.id}
                  className="px-3"
                  initial={{ opacity: 0, scaleY: 0, transformOrigin: 'bottom' }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  transition={{
                    duration: 1.7,
                    ease: 'easeOut',
                    delay: delay[item.id],
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
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
                </motion.div>
              )
            })}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
