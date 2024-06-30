
import { FC } from 'hono/jsx'
import { css } from 'hono/css'
import { BlogPostList } from '../components/blogPost/BlogPostList'
import { Note } from '../libs/note'
import { NoteList } from '../components/note/NoteList'

const Notes: FC<{ notes: Note[] }> = ({ notes }) => {
  return (
    <div className={css`min-height: 100vh; padding: 0.625rem;`}>
      <main className={css`display: flex; flex-wrap: wrap;`}>
        <div className={css`width: 100%;`}>
          <div className={css`padding: 0.75rem;`}>
          <h2 className={css`font-size: 1.25rem; font-weight: bold; color: white;`}>Note</h2>
            <NoteList notes={notes} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Notes
