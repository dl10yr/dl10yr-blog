import { FC } from "hono/jsx"
import { css } from "hono/css"
import { Note } from "../../libs/note"
import { NotePostLink } from "./NotePostLink"

export const NoteList: FC<{ notes: Note[] }> = ({ notes }) => {
  return (
    <div className={css`
      border-color: #6B7280;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
    `}>
      {notes.map((note) => {
        return <NotePostLink date={note.date} content={note.content} path={note.path} />
      })}
    </div>
  )
}
