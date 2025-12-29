import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const postsDirectory = join(process.cwd(), '_posts')

export type BlogItem = {
  title: string
  excerpt: string
  coverImage: string
  date: string
  author: {
    name: string
    picture: string
  }
  picture: string
  ogImage: {
    url: string
  }
  category: string[]
  childCategory: string[]
  isVisible: boolean
  slug: string
  content: string
}

export const getPostByPath = (
  year: string,
  month: string,
  slug: string,
  fields: string[] = []
): BlogItem => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${year}/${month}/${realSlug}/blogpost.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Record<string, any> = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
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

  return items as BlogItem
}

export const getAllPosts = (fields: string[] = []): BlogItem[] => {
  const dirs = fs.readdirSync(join(process.cwd(), '_posts'))
  const years = dirs.filter((d: string) => d !== '_template')
  const postPaths: Array<{ year: string; month: string; slug: string }> = []
  for (const year of years) {
    const months = fs.readdirSync(join(process.cwd(), `_posts/${year}`))
    for (const month of months) {
      const slugs = fs.readdirSync(join(process.cwd(), `_posts/${year}/${month}`))
      slugs.forEach((slug: string) => {
        postPaths.push({ year, month, slug })
      })
    }
  }
  fields.push('isVisible')
  const posts = postPaths
    .map(path => getPostByPath(path.year, path.month, path.slug, fields))
    .filter((post: BlogItem) => {
      return post.isVisible === true
    })
    // sort posts by date in descending order
    .sort((post1: BlogItem, post2: BlogItem) => (post1.date > post2.date ? -1 : 1))
  return posts
}
