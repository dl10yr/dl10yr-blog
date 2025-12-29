import { css } from 'hono/css'
import { FC } from 'hono/jsx'
import { ArticleShortList } from '../components/article/ArticleShortList'
import { BlogPostShortList } from '../components/blogPost/BlogPostShortList'
import { Button } from '../components/shared/Button'
import { BlogItem } from '../libs/blogPosts'
import { FeedItem } from '../libs/feedItems'

const Home: FC<{ feedItems: FeedItem[]; blogPosts: BlogItem[] }> = ({ feedItems, blogPosts }) => {
  return (
    <div
      className={css`
        min-height: 100vh;
        padding: 0.625rem;
        color: white;
      `}
    >
      <main className="flex flex-wrap">
        <div className="w-full">
          <div className="p-3">
            <h2 className="text-xl font-bold text-cdred">Article</h2>
            <ArticleShortList feedItems={feedItems} />
            <a href="/articles">
              <Button label="more..." primary={true} />
            </a>
          </div>
          <div className="p-3">
            <h2 className="text-xl font-bold text-cdorange">Blog Posts</h2>
            <BlogPostShortList blogPosts={blogPosts} />
            <a href="/blog">
              <Button label="more..." primary={true} />
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
