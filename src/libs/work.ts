import matter from 'gray-matter'

type WorkFrontMatter = {
  date?: string
}

type WorkEntry = {
  path: string
  frontMatter: WorkFrontMatter
  content: string
}

// Import all work markdown files at build time to avoid fs at runtime.
const workModules = import.meta.glob('../../_works/**/post.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const parseWorks = (): WorkEntry[] => {
  return Object.entries(workModules)
    .map(([path, raw]) => {
      const match = path.match(/_works\/(.+?)\/post\.md$/)
      if (!match) return null
      const [, workPath] = match
      const { data, content } = matter(raw as string)

      return {
        path: workPath,
        frontMatter: data as WorkFrontMatter,
        content,
      }
    })
    .filter(Boolean) as WorkEntry[]
}

const WORKS = parseWorks()

export type WorkPost = {
  date: string
  path: string
  content: string
}

export const getWorkPostByPath = (path: string): WorkPost => {
  const entry = WORKS.find(work => work.path === path)
  if (!entry) {
    throw new Error(`Work post not found for path ${path}`)
  }

  const item = {} as WorkPost
  const fields = ['path', 'content', 'date']

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'path') {
      item['path'] = `works/${path}`
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
