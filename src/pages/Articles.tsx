import { css } from 'hono/css'
import { FC } from 'hono/jsx'
import { FeedItem } from '../libs/feedItems'
import { ArticleList } from '../components/article/ArticleList'

const Articles: FC<{ feedItems: FeedItem[] }> = ({ feedItems }) => {
  return (
    <div
      className={css`
        min-height: 100vh;
        padding: 0.625rem;
      `}
    >
      <main
        className={css`
          display: flex;
          frex-wrap: wrap;
        `}
      >
        <div
          className={css`
            width: 100%;
          `}
        >
          <div
            className={css`
              padding: 0.75rem;
            `}
          >
            <h2
              className={css`
                font-size: 1.25rem;
                font-weight: bold;
                color: white;
              `}
            >
              Articles
            </h2>
            <ArticleList feedItems={feedItems} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Articles
