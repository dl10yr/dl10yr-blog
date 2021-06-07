import Parser from 'rss-parser'
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const parser = new Parser()

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
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

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url)
  if (!feed?.items?.length) return []

  // return item which has title and link
  return feed.items
    .filter(({ title, link }) => title && link)
    .map(({ title, link, isoDate }) => {
      return {
        title,
        link,
        isoDate,
        dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
      }
    })
}

export async function getFeedItems(sources) {
  if (!sources?.length) return []
  let feedItems = []
  for (const url of sources) {
    const items = await fetchFeedItems(url)
    feedItems = [...feedItems, ...items]
  }
  feedItems.sort((a, b) => {
    return a.dateMiliSeconds >= b.dateMiliSeconds ? -1 : 1
  })
  return feedItems
}
