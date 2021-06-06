import React from 'react'
import { feedItem } from 'types'
import simpleIcons from 'simple-icons'

export interface ArticleCardInterface {
  item: feedItem
  key: any
}

export const ArticleCard: React.FC<ArticleCardInterface> = ({ item }) => {
  const hostname = item.link ? new URL(item.link).hostname : ''
  const service = hostname.split('.')[0]

  return (
    <div className="mb-2 px-4 py-2 flex shadow hover:bg-gray-600 br rounded-lg">
      <div className="mr-2">
        <img src={simpleIcons.get(service).svg} />
      </div>
      <div className="">
        <div className="font-semibold">{item.title}</div>
        <div className="font-light flex">
          <span>{item.isoDate}</span>
          <span>{service}</span>
        </div>
      </div>
    </div>
  )
}
