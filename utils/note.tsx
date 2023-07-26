import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const notesDirectory = join(process.cwd(), '_notes')

export function getNoteSlugs() {
  return fs.readdirSync(notesDirectory)
}

export function getNoteBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(notesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllNotes(fields = []) {
  const slugs = getNoteSlugs()
  fields.push('isVisible')

  const posts = slugs
    .map((slug) => getNoteBySlug(slug, fields))
    .filter((post: any) => {
      return post.isVisible === true
    })
    // sort posts by date in descending order
    .sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1))
  return posts
}
