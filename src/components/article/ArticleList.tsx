import { css } from 'hono/css'
import { FC } from 'hono/jsx'
import { FeedItem } from '../../libs/feedItems'
import { ArticleCard } from './ArticleCard'

export const ArticleList: FC<{ feedItems: FeedItem[] }> = ({ feedItems }) => {
  return (
    <div
      className={css`
        border-color: #6b7280;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
      `}
    >
      {feedItems.map(item => {
        return (
          <a
            href={item.link}
            key={item.dateMiliSeconds}
            className={css`
              text-decoration: none;
            `}
          >
            <ArticleCard item={item} />
          </a>
        )
      })}
    </div>
  )
}
