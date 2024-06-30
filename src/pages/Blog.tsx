
import { FC } from 'hono/jsx'
import { css } from 'hono/css'
import { BlogItem } from '../libs/blogPosts'
import { BlogPostList } from '../components/blogPost/BlogPostList'

const Blog: FC<{ postsList: BlogItem[] }> = ({ postsList }) => {
  return (
    <div className={css`min-height: 100vh; padding: 0.625rem;`}>
      <main className={css`display: flex; flex-wrap: wrap;`}>
        <div className={css`width: 100%;`}>
          <div className={css`padding: 0.75rem;`}>
          <h2 className={css`font-size: 1.25rem; font-weight: bold; color: white;`}>Blog</h2>
            <BlogPostList blogPosts={postsList} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Blog