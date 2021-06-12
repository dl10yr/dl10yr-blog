import React from 'react'
import Link from 'next/link'

export interface BlogPostLinkInterface {
  title: string
  date: string
  slug: string
}

export const BlogPostLink: React.FC<BlogPostLinkInterface> = ({ title, date, slug }) => {
  return (
    <Link href={`/blog/${slug}/`}>
      <div className="p-2 border-b hover:bg-gray-500 cursor-pointer">
        <div className="font-semibold">{title}</div>
        <div>{date}</div>
      </div>
    </Link>
  )
}
