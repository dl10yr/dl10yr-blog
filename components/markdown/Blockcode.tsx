import React, { PropsWithChildren } from 'react'

import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { mediaQuery } from '../../styles/const'
import Code from '@/components/markdown/Code'
import Pre from '@/components/markdown/Pre'

export type Props = Readonly<
  PropsWithChildren<{
    language?: SyntaxHighlighterProps['language']
  }>
>

const Blockcode = (props: Props): JSX.Element => {
  const { children, language, ...rest } = props
  return (
    <div data-testid="Blockcode" className="bg-gray-900 text-white text-xs" {...rest}>
      {language ? (
        <div>
          <div className="bg-gray-700 inline-block text-white p-2">{language}</div>
          <div className="my-3 px-5 overflow-x-scroll">
            <SyntaxHighlighter style={okaidia} language={language} PreTag={Pre} CodeTag={Code}>
              {children}
            </SyntaxHighlighter>
          </div>
        </div>
      ) : (
        <Pre>
          <Code>{children}</Code>
        </Pre>
      )}

      <style>{`
        .blockcode {
          background-color: var(--color-default-surface);
          font-size: 0.875rem;
          margin-left: calc(var(--gap-size) * -1);
          margin-right: calc(var(--gap-size) * -1);
          margin-bottom: calc(var(--gap-size) * 2);
          padding: calc(var(--gap-size) * 1.5) calc(var(--gap-size));
          ${language ? `padding-top: 0;` : ''}
        }
        .language {
          display: inline-block;
          vertical-align: middle;
          background-color: var(--color-default-surface);
          font-family: var(--font-family-code);
          font-size: 0.75rem;
          margin-bottom: var(--gap-size);
          padding: 0.125rem 0.5rem;
          transform: translateX(-0.5rem);
        }
        @media ${mediaQuery.sm} {
          .blockcode {
            margin-left: calc(var(--gap-size) * -2);
            margin-right: calc(var(--gap-size) * -2);
            padding: calc(var(--gap-size) * 1.5) calc(var(--gap-size) * 2);
            ${language ? `padding-top: 0;` : ''}
          }
        }
      `}</style>
    </div>
  )
}

export default Blockcode
