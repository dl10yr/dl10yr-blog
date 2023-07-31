import { Note, getAllNotes, getNoteByPath } from '@/lib/note'

export const dynamicParams = false

export function generateStaticParams() {
  const notes = getAllNotes()
  return notes.map((note: Note) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [prefix, year, month, day, slug] = note.path.split('/')
    return { year, month, day, slug }
  })
}

function fetchNoteDetailData(
  targetYear: string,
  targetMonth: string,
  targetDay: string,
  targetSlug: string
) {
  const note = getNoteByPath(targetYear, targetMonth, targetDay, targetSlug)
  return note
}

export default async function Page({ params }) {
  const note = fetchNoteDetailData(params.year, params.month, params.day, params.slug)

  return (
    <div className="w-full">
      <article className="p-5 lg:rounded-lg h-entry">
        <div className="info p-2">
          <div className="py-2">{note.date}</div>
        </div>
        <div>
          <div className="e-content">{note.content}</div>
        </div>
        <div className="hidden">
          <div className="p-name">{note.content}</div>
          <a className="u-bridgy-fed" href="https://fed.brid.gy"></a>
          <p className="dt-published">{note.date}</p>
        </div>
      </article>
    </div>
  )
}
