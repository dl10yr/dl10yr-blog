import Head from 'next/head'
import { getWorkPostByPath } from '@/lib/work'
import Markdown from '@/components/markdown/Markdown'

export default function Page() {
  const { content } = getWorkPostByPath('ios-app/terms')
  return (
    <div className="min-h-screen p-5">
      <Head>
        <title>iOS App Terms</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="p-5 lg:rounded-lg">
        <Markdown source={content} metas={[]} />
      </article>
    </div>
  )
}
