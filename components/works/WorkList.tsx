import React from 'react'
import { WorkCard } from '@/components/works/WorkCard'
import { workItem } from 'types'

export interface ArticleListInterface {
  workItems: workItem[]
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
