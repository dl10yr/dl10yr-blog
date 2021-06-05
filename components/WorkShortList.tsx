import React from 'react'
import { WorkCard } from './WorkCard'

export const WorkShortList: React.FC = () => {
  return (
    <div className="flex flex-wrap">
      <WorkCard />
      <WorkCard />
      <WorkCard />
      <WorkCard />
    </div>
  )
}
