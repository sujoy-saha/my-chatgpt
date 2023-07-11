'use client'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Azure OpenAI ChatGPT',
  description: 'ChatGPT app using next.js, okta, and Azure OpenAI service.',
}
export default function RootLayout({
  session,  
  children,
}: {
  children: React.ReactNode,
  session: Session
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>          
          <body className={inter.className}>{children}</body>
        </SessionProvider>        
      </body>
    </html>
  )
}
