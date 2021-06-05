import React from 'react'
import { ArticleCard } from '@/components/ArticleCard'

export const ArticleShortList: React.FC = () => {
  return (
    <div className="border-gray-500 py-1 my-1">
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </div>
  )
}
