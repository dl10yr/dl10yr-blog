import Head from 'next/head'
import { ArticleShortList } from '@/components/ArticleShortList'
import { BlogPostShortList } from '@/components/BlogPostShortList'
import { WorkShortList } from '@/components/WorkShortList'
import { ProfileCard } from '@/components/ProfileCard'

export default function Home() {
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
            <h2 className="text-xl font-bold text-pink-400">Articles</h2>
            <ArticleShortList />
          </div>
          <div className="p-3">
            <h2 className="text-xl font-bold text-yellow-400">Blog Posts</h2>
            <BlogPostShortList />
          </div>
          <div className="p-3">
            <h2 className="text-xl font-bold text-blue-400">Works</h2>
            <WorkShortList />
          </div>
        </div>
        <div className="w-full lg:w-1/3 pt-12 px-5">
          <ProfileCard />
        </div>
      </main>
    </div>
  )
}
