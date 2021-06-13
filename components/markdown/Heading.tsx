import React, { createElement, PropsWithChildren } from 'react'

import { slug } from 'github-slugger'
import { onlyText } from 'react-children-utilities'

export type Props = Readonly<
  PropsWithChildren<{
    level?: number
  }>
>

const Heading = (props: Props): JSX.Element => {
  const { level = 1, children, ...rest } = props

  const text = onlyText(children)
  const id = slug(text)
  const className = 'p-1 border-b m-1 my-3'

  return createElement(
    `h${level}`,
    { id, className, ...rest },
    <a href={`#${id}`} className="headingLink">
      {children}
      <style jsx>{`
        .headingLink {
          text-shadow: 0 0 3px var(--color-default-bg);
        }
      `}</style>
    </a>
  )
}

export default Heading