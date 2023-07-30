import React from 'react'

export const ProfileCard: React.FC = () => {
  return (
    <div className="mx-auto w-full px-4 py-2 shadow bg-yellow-900 rounded-lg">
      <a
        href="https://dl10yr.com/"
        className="font-bold text-2xl text-center h-card m-auto"
        rel="me"
      >
        dl10yr
      </a>
    </div>
  )
}
