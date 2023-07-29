import React from 'react'
import { WorkCard } from '@/components/works/WorkCard'
import { WorkItem } from '@/lib/work'

export interface ArticleListInterface {
  workItems: WorkItem[]
}

export const WorkList: React.FC<ArticleListInterface> = ({ workItems }) => {
  return (
    <div className="border-gray-500 py-1 my-1">
      {workItems.map((item) => {
        return <WorkCard item={item} key={item.title} />
      })}
    </div>
  )
}
