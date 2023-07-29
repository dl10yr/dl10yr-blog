'use client'
import { PropsWithChildren } from 'react'

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import remarkSectionize from 'remark-sectionize'
import { CodeComponent, Components, HeadingComponent } from 'react-markdown/lib/ast-to-react'

import Blockcode from '@/components/markdown/Blockcode'
import Blockquote from '@/components/markdown/Blockquote'
import ResponsiveTable from '@/components/markdown/ResponsiveTable'
import LinkCard from '@/components/markdown/LinkCard'
import Heading from '@/components/markdown/Heading'
import { Meta } from '@/lib/utils'

export interface MarkdownInterface {
  source: string
  metas: Meta[]
}

const Markdown: React.FC<MarkdownInterface> = ({ source, metas }) => {
  const code: CodeComponent = (props) => {
    const { inline, children } = props

    if (inline || !children) {
      return <code>{children}</code>
    }

    if (!props.node.properties) {
      throw new Error('Error: コードに属性は必須です')
    }

    let { className: language } = props.node.properties
    language = String(language).replace('language-', '')

    return <Blockcode language={language as string}>{children}</Blockcode>
  }

  const section = (props: PropsWithChildren<unknown>) => {
    const { children } = props

    return <section>{children}</section>
  }

  const heading: HeadingComponent = (props) => {
    const { level, children } = props

    return <Heading level={level}>{children}</Heading>
  }

  const img: Components['img'] = (props) => {
    if (!props.node.properties) {
      throw new Error('Error: 画像に属性は必須です')
    }

    const { src, alt } = props.node.properties

    return (
      <div className="mdImg">
        <img src={src as string} alt={alt as string} />
        <style>{`
          .mdImg {
            max-width: 100%;
          }
        `}</style>
      </div>
    )
  }

  const a: Components['a'] = (props) => {
    const { children } = props
    const { href } = props.node.properties as any

    return (
      <LinkCard href={href as string} metas={metas}>
        {children}
      </LinkCard>
    )
  }

  const ul = (props) => {
    const { children } = props
    return <ul className="list-disc pl-6 my-2">{children}</ul>
  }

  const blockquote = (props: PropsWithChildren<unknown>) => {
    const { children } = props

    return <Blockquote>{children}</Blockquote>
  }

  const table = (props: PropsWithChildren<unknown>) => {
    const { children } = props

    return <ResponsiveTable>{children}</ResponsiveTable>
  }

  const p = (props: PropsWithChildren<unknown>) => {
    const { children } = props
    return <div>{children}</div>
  }

  return (
    <ReactMarkdown
      remarkPlugins={[gfm, remarkSectionize]}
      components={{
        code,
        section,
        img,
        h1: heading,
        h2: heading,
        h3: heading,
        h4: heading,
        h5: heading,
        h6: heading,
        a,
        blockquote,
        table,
        p,
        ul,
      }}
    >
      {source}
    </ReactMarkdown>
  )
}

export default Markdown
