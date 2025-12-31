import matter from 'gray-matter'

type BlogFrontMatter = {
  title?: string
  excerpt?: string
  coverImage?: string
  date?: string
  author?: {
    name: string
    picture: string
  }
  picture?: string
  ogImage?: {
    url: string
  }
  category?: string[]
  childCategory?: string[]
  isVisible?: boolean
}

type BlogPostEntry = {
  year: string
  month: string
  slug: string
  frontMatter: BlogFrontMatter
  content: string
}

// Import all blog markdown files at build time so we do not rely on fs in the runtime bundle.
const blogPostModules = import.meta.glob('../../_posts/**/blogpost.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const parseBlogPosts = (): BlogPostEntry[] => {
  return Object.entries(blogPostModules)
    .map(([path, raw]) => {
      const match = path.match(/_posts\/(.+?)\/(.+?)\/([^/]+)\/blogpost\.md$/)
      if (!match) return null
      const [, year, month, slug] = match
      const { data, content } = matter(raw as string)

      return {
        year,
        month,
        slug,
        frontMatter: data as BlogFrontMatter,
        content,
      }
    })
    .filter(Boolean) as BlogPostEntry[]
}

const BLOG_POSTS = parseBlogPosts()

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
  const entry = BLOG_POSTS.find(
    post => post.year === year && post.month === month && post.slug === slug
  )

  if (!entry) {
    throw new Error(`Blog post not found for path ${year}/${month}/${slug}`)
  }

  const items: Record<string, any> = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = entry.slug
    }
    if (field === 'content') {
      items[field] = entry.content
    }

    if (entry.frontMatter[field as keyof BlogFrontMatter] !== undefined) {
      items[field] = entry.frontMatter[field as keyof BlogFrontMatter]
    }
  })

  return items as BlogItem
}

export const getAllPosts = (fields: string[] = []): BlogItem[] => {
  const fieldsWithVisibility = Array.from(new Set([...fields, 'isVisible']))
  const posts = BLOG_POSTS.map(post =>
    getPostByPath(post.year, post.month, post.slug, fieldsWithVisibility)
  )
    .filter((post: BlogItem) => post.isVisible === true)
    // sort posts by date in descending order
    .sort((post1: BlogItem, post2: BlogItem) => (post1.date > post2.date ? -1 : 1))
  return posts
}
