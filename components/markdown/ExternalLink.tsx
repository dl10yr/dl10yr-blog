import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

type NoTargetElement = Readonly<
  PropsWithChildren<unknown> & Omit<ComponentPropsWithoutRef<'a'>, 'target' | 'className'>
>

type Props = Readonly<
  {
    disableVisited?: boolean
  } & NoTargetElement
>

const addRel = (props: NoTargetElement): NoTargetElement => {
  const rel = props?.rel?.split(' ') || []
  rel.push(...['noopener', 'noreferrer'])

  return {
    ...props,
    rel: Array.from(new Set(rel)).join(' '),
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExternalLink = ({ children, disableVisited = false, ...rest }: Props): JSX.Element => {
  return (
    <a target="_blank" className="link text-green-600 w-full break-words" {...addRel(rest)}>
      {children}
    </a>
  )
}

export default ExternalLink
