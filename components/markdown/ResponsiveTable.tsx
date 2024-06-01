import React, { PropsWithChildren } from 'react'

type Props = Readonly<
  PropsWithChildren<{
    language?: string
  }>
>

const ResponsiveTable = (props: Props): JSX.Element => {
  const { children, ...rest } = props

  return (
    <div className="responsiveTable">
      <table className="table" {...rest}>
        {children}
      </table>

      <style>{`
        .responsiveTable {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin-bottom: calc(var(--gap-size) * 2);
        }
        .table {
          width: 100%;
          margin-bottom: 1rem;
          vertical-align: top;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

export default ResponsiveTable
