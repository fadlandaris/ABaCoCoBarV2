'use client'

import React from 'react'
import { ApertureIcon, RocketLaunchIcon } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

interface BtnProps {
  value: string
  variant?: boolean
  onClick?: () => void
  disabled?: boolean
  processing?: boolean
}

export default function Btn({ value, variant, onClick, disabled }: BtnProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) return onClick()

    if (variant) {
      const phoneNumber = '6282144676507'
      const message = encodeURIComponent('Halo, saya ingin bertanya terkait ABaCoCoBar')
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    } else {
      router.push('/scan')
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${
        variant
          ? 'bg-gradient-to-b from-foreground to-foreground/70 text-white shadow-[0px_5px_11px_-7px_#ffffff] border-t-2 border-neutral-300/30'
          : 'bg-gradient-to-b from-primary to-primary/70 text-white shadow-[0px_5px_11px_-7px_#ff3a0d]'
      } px-4 py-2 rounded-2xl flex items-center gap-x-2 cursor-pointer hover:scale-110 transition-all duration-600 group ${
        disabled ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {!variant ? (
        <ApertureIcon size={18} weight="fill" className={'animate-spin'} />
      ) : (
        <RocketLaunchIcon size={16} weight="fill" />
      )}
      {value}
    </button>
  )
}
