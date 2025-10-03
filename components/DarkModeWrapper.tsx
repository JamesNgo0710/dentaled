'use client'

import { useEffect } from 'react'
import { DarkModeProvider, useDarkMode } from '@/contexts/DarkModeContext'

function DarkModeSync() {
  const { darkMode } = useDarkMode()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return null
}

export function DarkModeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DarkModeProvider>
      <DarkModeSync />
      {children}
    </DarkModeProvider>
  )
}
