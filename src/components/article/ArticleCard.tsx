
import * as simpleIcons from 'simple-icons'
import { format, parseJSON } from 'date-fns'
import { FC } from 'hono/jsx'
import { FeedItem } from '../../libs/feedItems'
import { css } from 'hono/css'

const articleCardCss = css`
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;

  &:hover {
    background-color: #4B5563;
  }
`

export const ArticleCard: FC<{ item: FeedItem }> = ({ item }) => {
  const hostname = item.link ? new URL(item.link).hostname : ''
  const service = hostname.split('.')[0]

  const isQiita = service === 'qiita'
  const iconAttr = `si${service.substring(0, 1).toUpperCase() + service.substring(1)}`
  const icon = simpleIcons[iconAttr as keyof typeof simpleIcons]
  const hasSvg = true

  const svgStr = icon.svg ? icon.svg : ''
  const color = icon.hex ? icon.hex.toLowerCase() : '#fff'
  const getColoredIcon = (svgStr: string, color: string) => {
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
    <div className={articleCardCss}>
      <div className={css`
        margin-right: 4px;
      `}>
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
      <div className={css`width: 100%; color: white;`}>
        <div className={css`font-weight: 600;`}>{item.title}</div>
        <div className={css`display: flex; justify-content: space-between;`}>
          <span>{dateFormatted}</span>
          <span>{service}</span>
        </div>
      </div>
    </div>
  )
}
