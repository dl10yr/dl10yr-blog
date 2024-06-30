
import { FC } from 'hono/jsx'
import { css } from 'hono/css'
import { BlogItem } from '../libs/blogPosts'

const BlogPost: FC<{ post: BlogItem, innerHtml: string }> = ({ post, innerHtml }) => {

  return (
    <div className={css`width: 100%; color: white;`}>
      <article className={css`padding: 1.25rem;`}>
        <div className={css`padding: 0.5rem;`}>
          <div className={css`font-weight: bold; font-size: 1.25rem;`}>{post.title}</div>
          <div className={css`padding-top: 0.5rem; padding-bottom: 0.5rem;`}>{post.date}</div>
        </div>
        <div className={css`color: white;`} dangerouslySetInnerHTML={{ __html: innerHtml }}></div>
      </article>
    </div>
  )
}

export default BlogPost
