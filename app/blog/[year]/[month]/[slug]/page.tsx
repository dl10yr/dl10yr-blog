import { getPostByPath, getAllPosts, BlogItem } from '@/lib/blogPosts'
import Markdown from '@/components/markdown/Markdown'
import { getMetaData, getRandom, getUrlList, Meta } from '@/lib/utils'

export interface PostProps {
  post: BlogItem
  postsList: BlogItem[]
  metas: Meta[]
}

export function generateStaticParams() {
  const posts = getAllPosts(['slug', 'date'])

  const getYearMonth = (date) => {
    return {
      year: date.split('.')[0],
      month: date.split('.')[1],
    }
  }
  return posts.map((post: BlogItem) => {
    const { year, month } = getYearMonth(post.date)
    return { year, month, slug: post.slug }
  })
}

async function fetchPostDetailData(targetYear, targetMonth, targetSlug) {
  const post = getPostByPath(targetYear, targetMonth, targetSlug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'excerpt',
  ])
  const urls = getUrlList(post.content)
  const metas = await Promise.all(urls.map(getMetaData))
  const filteredMetas = metas.filter((m) => m !== undefined)
  const postsList = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt'])

  const randomPostsList = getRandom(postsList, 10)
  const filtered = randomPostsList.filter((post: BlogItem) => post.slug !== targetSlug)

  return {
    post,
    postsList: filtered,
    metas: filteredMetas,
  }
}

export default async function Page({ params }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { post, metas, postsList } = await fetchPostDetailData(
    params.year,
    params.month,
    params.slug
  )

  return (
    <div className="w-full">
      <article className="p-5 lg:rounded-lg">
        <div className="info p-2">
          <div className="text-xl font-bold">{post.title}</div>
          <div className="py-2">{post.date}</div>
        </div>
        <Markdown source={post.content} metas={metas} />
      </article>
    </div>
  )
}
