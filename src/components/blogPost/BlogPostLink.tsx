import { FC } from "hono/jsx"
import { BlogPostCard } from "./BlogPostCard"
import { css } from "hono/css"

export const BlogPostLink: FC<{ title: string, date: string, slug: string }> = ({ title, date, slug }) => {
  const [year, month] = date.split('.')
  return (
    <a href={`/blog/${year}/${month}/${slug}`} className={css`text-decoration: none;`}>
      <BlogPostCard  title={title} date={date} slug={slug} />
    </a>
  )
}
