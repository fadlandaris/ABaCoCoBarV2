'use client'

import React from 'react'
import { Navlinks } from '@/data/data'
import Navbtn from './navbtn'
import { motion } from "framer-motion";
import Logo from "../../../public/assets/logo.svg";

export default function Navbar({ goToSection }: { goToSection: (index: number) => void }) {
  return (
    <nav className='flex items-center justify-between fixed top-0 left-0 right-0 text-white px-12 pt-8 z-50'>
      <div className='flex items-center w-84'>
        <motion.div className='flex items-center rounded-full px-3 bg-black/30 backdrop-blur-sm'
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {Navlinks.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => goToSection(i)}
              className='p-3 text-sm capitalize hover:text-primary transition-all duration-600 transition-colors cursor-pointer'
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {item.nav}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <Logo className="w-6 h-6 text-white fill-current" />

      <div className='flex items-center justify-end w-84'>
        <Navbtn/>
      </div>
    </nav>
  )
}
