import React from 'react'
import { WorkItem } from '@/lib/work'
// import simpleIcons from 'simple-icons'
// import { format, parseJSON } from 'date-fns'
import Link from 'next/link'

export interface ArticleCardInterface {
  item: WorkItem
  key: any
}

export const WorkCard: React.FC<ArticleCardInterface> = ({ item }) => {
  // const toLink = item.link ? item.link : ''

  return (
    <Link href={'/works/' + item.link}>
      <div className="mb-2 px-4 py-2 flex shadow hover:bg-gray-600 br rounded-lg">
        <div className="w-full">
          <div className="font-semibold">{item.title}</div>
        </div>
      </div>
    </Link>
  )
}
