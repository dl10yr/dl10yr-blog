import React from 'react'

export interface BlogPostLinkInterface {
  title: string
  date: string
  service: string
  link: string
}

export const BlogPostLink: React.FC<BlogPostLinkInterface> = ({ title, date, service, link }) => {
  return (
    <div className="p-2 border-b hover:border-gray-500">
      <a href={link}>
        <div className="font-semibold">{title}</div>
        <div>
          {date} {service}
        </div>
      </a>
    </div>
  )
}
