import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPostBySlug, getAllPosts } from '@/utils/utils'
import Markdown from '@/components/markdown/Markdown'

// export const config = { amp: true }

export default function Post({ post }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div className="min-h-screen p-3">
      <article className="">
        <div className="info">
          <div className="text-xl p-1">{post.title}</div>
          <div className="m-1">{post.date}</div>
          <div>{post.excerpt}</div>
        </div>
        <Markdown source={post.content} />
      </article>
    </div>
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

  return {
    props: {
      post,
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
