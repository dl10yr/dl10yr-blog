import matter from 'gray-matter'

type NoteFrontMatter = {
  date?: string
}

type NoteEntry = {
  year: string
  month: string
  day: string
  slug: string
  frontMatter: NoteFrontMatter
  content: string
}

// Import all note markdown files at build time to avoid fs at runtime.
const noteModules = import.meta.glob('../../_notes/**/note.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const parseNotes = (): NoteEntry[] => {
  return Object.entries(noteModules)
    .map(([path, raw]) => {
      const match = path.match(/_notes\/(.+?)\/(.+?)\/(.+?)\/([^/]+)\/note\.md$/)
      if (!match) return null
      const [, year, month, day, slug] = match
      const { data, content } = matter(raw as string)

      return {
        year,
        month,
        day,
        slug,
        frontMatter: data as NoteFrontMatter,
        content,
      }
    })
    .filter(Boolean) as NoteEntry[]
}

const NOTES = parseNotes()

export type Note = {
  date: string
  path: string
  content: string
}

export const getNoteByPath = (year: string, month: string, day: string, slug: string): Note => {
  const entry = NOTES.find(
    note => note.year === year && note.month === month && note.day === day && note.slug === slug
  )
  if (!entry) {
    throw new Error(`Note not found for path ${year}/${month}/${day}/${slug}`)
  }

  const item = {} as Note
  const fields = ['path', 'content', 'date']

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'path') {
      item['path'] = `note/${year}/${month}/${day}/${entry.slug}`
    }
    if (field === 'content') {
      item[field] = entry.content
    }
    if (field === 'date') {
      item[field] = entry.frontMatter.date
    }
  })

  return item
}

export const getAllNotes = (): Note[] => {
  const notes = NOTES.map(note => getNoteByPath(note.year, note.month, note.day, note.slug))
    // sort posts by date in descending order
    .sort((note1: Note, note2: Note) => (note1.date > note2.date ? -1 : 1))
  return notes
}
