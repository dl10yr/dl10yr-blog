import React from 'react'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-green-900 p-4 border-b-4 border-green-500">
      <div className="flex items-center flex-no-shrink text-white mr-6">
        <Link href="/">
          <span className="font-bold text-2xl tracking-tight cursor-pointer">dl10yr</span>
        </Link>
      </div>
      <div className="w-full flex flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-base font-semibold lg:flex-grow flex text-white">
          <a
            href="/article"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-gray-200 mr-4"
          >
            Articles
          </a>
          <a
            href="/blog"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-gray-200 mr-4"
          >
            Blog
          </a>
          <a
            href="/works"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-gray-200 mr-4"
          >
            Works
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Header
