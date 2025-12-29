import { FC } from 'hono/jsx'
import { css } from 'hono/css'
import { BlogPostLink } from './BlogPostLink'
import { BlogItem } from '../../libs/blogPosts'

export const BlogPostList: FC<{ blogPosts: BlogItem[] }> = ({ blogPosts }) => {
  return (
    <div
      className={css`
        border-color: #6b7280;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
      `}
    >
      {blogPosts.map(post => {
        return <BlogPostLink date={post.date} title={post.title} slug={post.slug} />
      })}
    </div>
  )
}
