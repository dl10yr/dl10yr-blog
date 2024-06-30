import { FC } from "hono/jsx"
import { css } from "hono/css"
import { NotePostCard } from "./NotePostCard"

export const NotePostLink: FC<{ content: string, date: string, path: string }> = ({ content, date, path }) => {
  return (
    <a href={`/${path}`} className={css`text-decoration: none;`}>
      <NotePostCard  content={content} date={date} />
    </a>
  )
}
