import React, { PropsWithChildren } from 'react'

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import remarkSectionize from 'remark-sectionize'
import { CodeComponent, Components, HeadingComponent } from 'react-markdown/src/ast-to-react'
import Link from 'next/link'

import Blockcode from '@/components/markdown/Blockcode'
import Blockquote from '@/components/markdown/Blockquote'
import ResponsiveTable from '@/components/markdown/ResponsiveTable'
import ExternalLink from '@/components/markdown/ExternalLink'
import Heading from '@/components/markdown/Heading'

export interface MarkdownInterface {
  source: string
}

const Markdown = ({ source }) => {
  const code: CodeComponent = (props) => {
    const { inline, children } = props

    if (inline) {
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

  // HeadingComponent が NormalComponent のインデックスシグネチャに
  // 準拠していないことでエラーとなるため、強制的に string として対応
  const fixingHeading = heading as unknown as string

  const img: Components['img'] = (props) => {
    if (!props.node.properties) {
      throw new Error('Error: 画像に属性は必須です')
    }

    const { src, alt } = props.node.properties

    return (
      <div className="ampImage">
        <amp-img src={src} alt={alt} layout="intrinsic" />
        <style jsx>{`
          .ampImage {
            max-width: 100%;
          }
        `}</style>
      </div>
    )
  }

  const a: Components['a'] = (props) => {
    if (!props.node.properties?.href) {
      throw new Error('Error: リンクにhref属性は必須です')
    }

    if (typeof props.node.properties.href !== 'string') {
      throw new Error('Error: リンクにhref属性はstringである必要があります')
    }

    const { children } = props
    const { href } = props.node.properties

    if (href.startsWith('http')) {
      return <ExternalLink href={href}>{children}</ExternalLink>
    }

    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    )
  }

  const p = (props) => {
    const { children } = props
    return <p className="p-2">{children}</p>
  }

  const blockquote = (props: PropsWithChildren<unknown>) => {
    const { children } = props

    return <Blockquote>{children}</Blockquote>
  }

  const table = (props: PropsWithChildren<unknown>) => {
    const { children } = props

    return <ResponsiveTable>{children}</ResponsiveTable>
  }

  return (
    <div data-testid="Markdown" className="markdown p-3">
      <ReactMarkdown
        remarkPlugins={[gfm, remarkSectionize]}
        components={{
          code,
          section,
          img,
          h1: fixingHeading,
          h2: fixingHeading,
          h3: fixingHeading,
          h4: fixingHeading,
          h5: fixingHeading,
          h6: fixingHeading,
          a,
          blockquote,
          table,
          p,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
