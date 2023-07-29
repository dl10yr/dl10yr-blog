import { ReactNode } from 'react'

import { Meta } from '@/lib/utils'

interface LinkCardProps {
  href: string
  children: ReactNode & ReactNode[]
  metas: Meta[]
}

const LinkCard: React.FC<LinkCardProps> = ({ href, metas }) => {
  const target = metas.find((meta) => meta.url === href)

  return (
    <a href={href} target="_blank" rel="noreferrer">
      <div className="w-full flex justify-around bg-white rounded-md p-3 border lg:w-1/2">
        <div className="w-1/2">
          <img src={target?.image || ''} alt={target?.title || ''} className="max-h-20 m-auto" />
        </div>
        <div className="flex flex-col justify-start px-1 ml-3">
          <div className="text-sm font-bold text-black whitespace-pre-wrap">
            {target?.title || ''}
          </div>
          <div className="text-gray-400 text-xs whitespace-pre-wrap">
            {target?.description || ''}
          </div>
        </div>
      </div>
    </a>
  )
}

export default LinkCard
