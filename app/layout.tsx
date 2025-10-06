import type { Metadata } from 'next'
import './globals.css'
import { DarkModeProvider } from '@/contexts/DarkModeContext'

export const metadata: Metadata = {
  title: 'DentalED - Patient Management',
  description: 'Professional dental patient management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('darkMode') === 'true') {
                  document.documentElement.classList.add('dark')
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased h-screen overflow-hidden" suppressHydrationWarning>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  )
}
