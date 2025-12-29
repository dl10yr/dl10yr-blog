import { css } from 'hono/css'
import { FC } from 'hono/jsx'
import { Note } from '../libs/note'

const infoCss = css`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`
const contentCss = css`
  color: white;
`

const NotePost: FC<{ note: Note }> = ({ note }) => {
  return (
    <div
      className={css`
        width: 100%;
        color: white;
      `}
    >
      <article
        className={css`
          padding: 1.25rem;
        `}
      >
        <div
          className={css`
            padding: 0.5rem;
          `}
        >
          <div className={infoCss}>
            <div className="info">{note.date}</div>
          </div>
        </div>
        <div className="e-content">
          <div className={contentCss}>{note.content}</div>
        </div>
        <div
          className={css`
            display: none;
          `}
        >
          <div className="p-name">{note.content}</div>
          <a className="u-bridgy-fed" href="https://fed.brid.gy"></a>
          <p className="dt-published">{note.date}</p>
        </div>
      </article>
    </div>
  )
}

export default NotePost
