import { BlogItem } from '../../libs/blogPosts'
import { FC } from 'hono/jsx'
import { BlogPostLink } from './BlogPostLink'


export const BlogPostShortList: FC<{ blogPosts: BlogItem[] }> = ({ blogPosts }) => {
  return (
    <div className="border-t border-gray-500 py-1 my-1">
      {blogPosts.map((post) => {
        return <BlogPostLink date={post.date} title={post.title} slug={post.slug} />
      })}
    </div>
  )
}

