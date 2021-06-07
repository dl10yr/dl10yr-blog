import React from 'react'
import { ArticleCard } from '@/components/ArticleCard'
import { feedItem } from 'types'

export interface ArticleListInterface {
  feedItems: feedItem[]
}

export const ArticleList: React.FC<ArticleListInterface> = ({ feedItems }) => {
  return (
    <div className="border-gray-500 py-1 my-1">
      {feedItems.map((item) => {
        return (
          <a href={item.link} key={item.dateMiliSeconds}>
            <ArticleCard item={item} key={item.dateMiliSeconds} />
          </a>
        )
      })}
    </div>
  )
}
