import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import { ProfileCard } from '@/components/shared/ProfileCard'

import 'tailwindcss/tailwind.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body>
        <Header />
        <main className="bg-gray-700 text-white font-sans text-black">
          <div className="min-h-screen flex flex-wrap">
            <div className="w-full g:p-5 lg:w-2/3">{children}</div>
            <div className="w-full mx-auto lg:w-1/3 pt-5 px-5 py-3">
              <ProfileCard />
              <a href="https://dl10yr.com/" className="h-card" rel="me">
                dl10yr
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
