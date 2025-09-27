import './globals.css'
import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from './providers'
import ConditionalNavbar from '../components/ConditionalNavbar'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata = {
  title: 'xPath Pro - Free SDET Course',
  description: 'Learn Software Development Engineer in Test (SDET) skills with our comprehensive free course',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ConditionalNavbar />
          {children}
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  )
}