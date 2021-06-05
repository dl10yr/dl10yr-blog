import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="bg-gray-700 text-white">{children}</main>
      <Footer />
    </div>
  )
}
