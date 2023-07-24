import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPostBySlug, getAllPosts } from '@/utils/utils'
import Markdown from '@/components/markdown/Markdown'
import { ProfileCard } from '@/components/ProfileCard'
import BlogPostShortList from '@/components/BlogPostShortList'

export const config = { amp: false }

export default function Post({ post, postsList }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <main className="min-h-screen p-3 flex flex-wrap">
      <div className="w-full lg:w-2/3">
        <article className="">
          <div className="info p-2">
            <div className="text-xl font-bold">{post.title}</div>
            <div className="py-2">{post.date}</div>
            <div className="">{post.excerpt}</div>
          </div>
          <a href="https://dl10yr.com/" className="h-card" rel="me">
            dl10yr
          </a>
          {/* <div className="h-entry">
            <p className="e-content">
              Two naked tags walk into a bar. The bartender exclaims, Hey, you can not come in here
              without microformats, this is a classy joint!
            </p>
            <a className="u-bridgy-fed" href="https://fed.brid.gy/"></a>
          </div> */}
          <div className="h-entry">
            <div className="e-content">hello2</div>
            <div className="hidden">
              <a className="u-bridgy-fed" href="https://fed.brid.gy/"></a>
            </div>
          </div>
          <Markdown source={post.content} />
        </article>
      </div>
      <div className="w-full mx-auto lg:w-1/3 pt-12 px-5">
        <ProfileCard />
        <div className="p-3">
          <BlogPostShortList postsList={postsList} />
        </div>
      </div>
    </main>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'excerpt',
  ])
  const postsList = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt'])
  const filtered = postsList.filter((post: any) => post.slug !== params.slug)
  return {
    props: {
      post,
      postsList: filtered,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post: any) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
