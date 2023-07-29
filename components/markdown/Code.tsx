import React, { PropsWithChildren } from 'react'

type Props = Readonly<PropsWithChildren<unknown>>

const Code = (props: Props): JSX.Element => {
  const { children } = props

  return (
    <code data-testid="Code" className="code">
      {children}
      <style>{`
        .code {
          display: block;
        }
      `}</style>
    </code>
  )
}

export default Code
