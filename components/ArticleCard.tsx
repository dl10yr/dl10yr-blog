import React from 'react'
import { feedItem } from 'types'
import simpleIcons from 'simple-icons'
import { format, parseJSON } from 'date-fns'

export interface ArticleCardInterface {
  item: feedItem
  key: any
}

export const ArticleCard: React.FC<ArticleCardInterface> = ({ item }) => {
  const hostname = item.link ? new URL(item.link).hostname : ''
  const service = hostname.split('.')[0]

  const isQiita = service === 'qiita'
  const hasSvg = simpleIcons.get(service).svg ? true : false

  const svgStr = simpleIcons.get(service).svg ? simpleIcons.get(service).svg : ''
  const color = simpleIcons.get(service).hex ? simpleIcons.get(service).hex.toLowerCase() : '#fff'
  const getColoredIcon = (svgStr, color) => {
    const svgStrs = svgStr.split('<path ')
    const newStrs = svgStrs.map((str, index) => {
      if (index !== svgStrs.length - 1) {
        return str + `<path fill="%23${color}" `
      } else {
        return str
      }
    })
    const returnStr = newStrs.join('')
    return returnStr
  }
  const coloredIcon = getColoredIcon(svgStr, color)
  const InitStr = service.slice(0, 1).toUpperCase()
  const dateFormatted = format(parseJSON(item.isoDate), 'yyyy/MM/dd')

  return (
    <div className="mb-2 px-4 py-2 flex shadow hover:bg-gray-600 br rounded-lg">
      <div className="mr-2">
        {hasSvg && !isQiita ? (
          <div
            style={{
              width: '30px',
              height: '30px',

              backgroundImage: `url('data:image/svg+xml;utf8, ${coloredIcon}`,
            }}
          />
        ) : (
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              width: '30px',
              height: '30px',
              color: `#${color}`,
            }}
          >
            {InitStr}
          </div>
        )}
      </div>
      <div className="w-full">
        <div className="font-semibold">{item.title}</div>
        <div className=" flex justify-between">
          <span className="p-1 font-light text-sm  align-middle">{dateFormatted}</span>
          <span className="p-1 text-sm">{service}</span>
        </div>
      </div>
    </div>
  )
}
