import { css } from 'hono/css'
import type { FC } from 'hono/jsx'
import { WorkItem } from '../../libs/work'
import { WorkCard } from './WorkCard'

const worklistCss = css`
  border-color: #6b7280;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`

export const WorkList: FC<{ workItems: WorkItem[] }> = ({ workItems }) => {
  return (
    <div className={worklistCss}>
      {workItems.map(item => {
        return <WorkCard item={item} key={item.title} />
      })}
    </div>
  )
}
