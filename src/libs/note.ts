import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const notesDirectory = join(process.cwd(), '_notes')

export type Note = {
  date: string
  path: string
  content: string
}

export const getPostSlugs = (): string[] => fs.readdirSync(notesDirectory)

export const getNoteByPath = (year: string, month: string, day: string, slug: string): Note => {
  const realSlug = slug.replace(/\.md$/, '')
  const path = `${year}/${month}/${day}/${realSlug}`
  const fullPath = join(notesDirectory, `${path}/note.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const item = {} as Note
  const fields = ['path', 'content', 'date']

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'path') {
      item['path'] = `note/${path}`
    }
    if (field === 'content') {
      item[field] = content
    }
    if (field === 'date') {
      item[field] = data[field]
    }
  })

  return item
}

export const getAllNotes = (): Note[] => {
  const dirs = fs.readdirSync(join(process.cwd(), '_notes'))
  const years = dirs.filter(d => d !== '_template')
  const notePaths = [] as any[]
  for (const year of years) {
    const months = fs.readdirSync(join(process.cwd(), `_notes/${year}`))
    for (const month of months) {
      const days = fs.readdirSync(join(process.cwd(), `_notes/${year}/${month}`))
      for (const day of days) {
        const slugs = fs.readdirSync(join(process.cwd(), `_notes/${year}/${month}/${day}`))
        slugs.forEach(slug => {
          notePaths.push({ year, month, day, slug })
        })
      }
    }
  }
  const notes = notePaths
    .map(path => getNoteByPath(path.year, path.month, path.day, path.slug))
    // sort posts by date in descending order
    .sort((note1: Note, note2: Note) => (note1.date > note2.date ? -1 : 1))
  return notes
}
