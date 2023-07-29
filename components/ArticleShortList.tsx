import React from 'react'
import { ArticleCard } from '@/components/ArticleCard'
import { FeedItem } from '@/lib/feedItem'

export interface ArticlesListInterface {
  feedItems: FeedItem[]
}

export const ArticleShortList: React.FC<ArticlesListInterface> = ({ feedItems }) => {
  return (
    <div className="border-gray-500 py-1 my-1">
      {feedItems
        .filter((item, index) => index < 5)
        .map((item) => {
          return (
            <a href={item.link} key={item.dateMiliSeconds}>
              <ArticleCard item={item} key={item.dateMiliSeconds} />
            </a>
          )
        })}
    </div>
  )
}
