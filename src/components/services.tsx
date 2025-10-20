'use client'

import React from 'react'
import { serviceData } from '@/data/data'
import cloudBg from "../../public/assets/cloud.png"
import Image from 'next/image'

export default function Services() {
  return (
    <section className="border-x-[6px] border-neutral-300/20 max-w-7xl mx-auto text-foreground relative overflow-hidden py-16 lg:py-24 lg:py-32 px-4 lg:px-6">
      <div className="flex flex-col gap-y-12 lg:gap-y-24">
        {serviceData.map((item, i) => (
          <div
            key={i}
            className={`
              flex flex-col lg:flex-row w-full lg:h-[60vh] items-center
              ${i === 1 ? 'lg:flex-row-reverse' : ''}
              gap-10 lg:gap-0
            `}
          >
            {/* LEFT CONTENT */}
            <div
              className={`
                w-full lg:w-1/2 text-center lg:text-left
                ${item.id === 1 ? 'lg:pl-24' : 'lg:pr-24'}
              `}
            >
              {/* Title */}
              <div className="w-full text-4xl sm:text-5xl font-medium tracking-tighter border-0">
                <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 via-neutral-600 to-foreground">
                  {item.title}
                </h1>
                <h1>{item.title2}</h1>
              </div>

              {/* Description */}
              <p className="text-neutral-500 text-base lg:text-[18px] w-full sm:w-[50%]  lg:w-[70%] mt-6 lg:mt-8 font-medium mx-auto lg:mx-0 leading-relaxed">
                {item.desc}
              </p>

              {/* Button / Tag */}
              <div className="mt-6 lg:mt-8 inline-block p-3 px-5 rounded-xl bg-[#f2efeb]">
                <div className="flex items-center justify-center lg:justify-start gap-x-1 text-neutral-500 text-sm lg:text-base">
                  <item.icon weight="fill" size={20} />
                  <p>{item.title}</p>
                  <p>{item.title2}</p>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE / COMPONENT */}
            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden relative bg-gradient-to-b from-neutral-900/90 to-foreground h-[300px] sm:h-[500px] lg:h-[250px] lg:h-full border">
              <Image
                src={cloudBg}
                alt=""
                fill
                className="object-cover object-center opacity-40 z-10"
              />
              <div className="absolute text-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <item.components />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
