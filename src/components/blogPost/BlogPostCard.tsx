import { format } from 'date-fns'
import { css } from 'hono/css'
import { FC } from 'hono/jsx'

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
    background-color: #4b5563;
  }
`

export const BlogPostCard: FC<{ title: string; date: string; slug: string }> = ({
  title,
  date,
}) => {
  const dateFormatted = format(date, 'yyyy/MM/dd')

  return (
    <div className={articleCardCss}>
      <div
        className={css`
          width: 100%;
          color: white;
        `}
      >
        <div
          className={css`
            font-weight: 600;
          `}
        >
          {title}
        </div>
        <div className="flex justify-between">
          <span className="p-1 font-light text-sm  align-middle">{dateFormatted}</span>
        </div>
      </div>
    </div>
  )
}
