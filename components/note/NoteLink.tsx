import React from 'react'
import Link from 'next/link'

export interface BlogPostLinkInterface {
  content: string
  date: string
  path: string
}

export const NoteLink: React.FC<BlogPostLinkInterface> = ({ content, date, path }) => {
  return (
    <Link href={`/${path}`}>
      <div className="p-2 border-b hover:bg-gray-500 cursor-pointer">
        <div className="font-semibold">{content}</div>
        <div>{date}</div>
      </div>
    </Link>
  )
}
