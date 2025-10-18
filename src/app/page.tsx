'use client'

import React from 'react'
import Hero from '@/components/hero'
import About from '@/components/about'
import Services from '@/components/services'
import Guide from '@/components/guide'
import Footer from '@/components/footer'

export default function RootPage() {
  return (
    <main>
      <Hero/>
      <About/>
      <Services/>
      <Guide/>
      <Footer/>
    </main>
  )
}
