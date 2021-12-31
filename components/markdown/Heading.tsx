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
  const className =
    level === 1 ? 'p-1 border-b-2 m-1 my-3 text-xl font-bold' : 'p-1 m-1 my-1 text-lg font-bold'

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
