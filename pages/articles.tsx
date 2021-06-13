import Head from 'next/head'
import { ProfileCard } from '@/components/ProfileCard'
import { ArticleList } from '@/components/ArticleList'
import { getFeedItems } from '@/utils/utils'
import { sources } from '@/utils/sources'
import { feedItem } from 'types'

export interface ArticlesInterface {
  feedItems: feedItem[]
}

const Articles: React.FC<ArticlesInterface> = ({ feedItems }) => {
  return (
    <div className="min-h-screen p-2.5">
      <Head>
        <title>dl10yr</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-wrap">
        <div className="w-full lg:w-2/3">
          <div className="p-3">
            <h2 className="text-xl font-bold text-cdred">Articles</h2>
            <ArticleList feedItems={feedItems} />
          </div>
        </div>
        <div className="w-full lg:w-1/3 pt-12 px-5">
          <ProfileCard />
        </div>
      </main>
    </div>
  )
}

export default Articles

export async function getStaticProps() {
  let feedItems = []
  try {
    feedItems = await getFeedItems(sources)
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return { props: { feedItems: feedItems } }
  }
}
