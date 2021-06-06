import React from 'react'
import { ArticleCard } from '@/components/ArticleCard'
import { feedItem } from 'types'

export interface ArticlesListInterface {
  feedItems: feedItem[]
}

export const ArticleShortList: React.FC<ArticlesListInterface> = ({ feedItems }) => {
  return (
    <div className="border-gray-500 py-1 my-1">
      {feedItems.map((item) => {
        return <ArticleCard item={item} key={item.dateMilliSeconds} />
      })}
    </div>
  )
}
