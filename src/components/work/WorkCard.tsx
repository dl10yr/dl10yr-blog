import { FC } from 'hono/jsx'
import type { WorkItem } from '../../libs/work'
import { css } from 'hono/css'

const workCardCss = css`
  width: 100%;
  font-weight: 600;
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


export const WorkCard: FC<{ item: WorkItem, key: String }> = ({ item }) => {
  return (
    <a href={'/works/' + item.link}>
      <div className={workCardCss}>
        {item.title}
      </div>
    </a>
  )
}