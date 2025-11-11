import React from 'react'
import Image from 'next/image'
import LOGO from "../../../public/assets/logo.png"

export default function Logo() {
  return (
    <div className='fixed bottom-4 left-4 z-[999]'>
      <Image src={LOGO} alt={''} width={150} height={150}/>
    </div>
  )
}
