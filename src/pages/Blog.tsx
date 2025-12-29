import { css } from 'hono/css'
import { FC } from 'hono/jsx'
import { BlogPostList } from '../components/blogPost/BlogPostList'
import { BlogItem } from '../libs/blogPosts'

const Blog: FC<{ postsList: BlogItem[] }> = ({ postsList }) => {
  return (
    <div
      className={css`
        min-height: 100vh;
        padding: 0.625rem;
      `}
    >
      <main
        className={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        <div
          className={css`
            width: 100%;
          `}
        >
          <div
            className={css`
              padding: 0.75rem;
            `}
          >
            <h2
              className={css`
                font-size: 1.25rem;
                font-weight: bold;
                color: white;
              `}
            >
              Blog
            </h2>
            <BlogPostList blogPosts={postsList} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Blog
