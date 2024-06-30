export type WorkItem = {
  title: string
  link: string
  isoDate: string
}

import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const worksDirectory = join(process.cwd(), '_works')

export type WorkPost = {
  date: string
  path: string
  content: string
}

export const getPostSlugs = (): string[] => fs.readdirSync(worksDirectory)

export const getWorkPostByPath = (path: string): WorkPost => {
  const fullPath = join(worksDirectory, `${path}/post.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const item = {} as WorkPost
  const fields = ['path', 'content', 'date']

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'path') {
      item['path'] = `works/${path}`
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
