import { serveStatic } from '@hono/node-server/serve-static'
import { Hono, Context } from 'hono'
import { ssgParams } from 'hono/ssg'
import markdownit from 'markdown-it'
import markdownItImsize from 'markdown-it-imsize'
import Layout from './components/Layout'
import { getAllPosts, getPostByPath } from './libs/blogPosts'
import { getFeedItems, sources } from './libs/feedItems'
import { getAllNotes, getNoteByPath } from './libs/note'
import { getWorkPostByPath } from './libs/work'
import Articles from './pages/Articles'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Home from './pages/Home'
import NotePost from './pages/NotePost'
import Notes from './pages/Notes'
import WorkDetail from './pages/WorkDetail'
import Licenses from './pages/Licenses'

const app = new Hono()

app.use('/public/*', serveStatic({ root: './' }))

app.get('/', async c => {
  const feedItems = await getFeedItems(sources)

  const blogPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt'])

  return c.render(
    <Layout>
      <Home feedItems={feedItems} blogPosts={blogPosts} />
    </Layout>
  )
})

app.get('/articles', async c => {
  const feedItems = await getFeedItems(sources)

  return c.render(
    <Layout>
      <Articles feedItems={feedItems} />
    </Layout>
  )
})

app.get('/blog', async c => {
  const blogPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt'])

  return c.render(
    <Layout>
      <Blog postsList={blogPosts} />
    </Layout>
  )
})

app.get(
  '/blog/:year/:month/:slug',
  ssgParams(async () => {
    const blogPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt'])
    return blogPosts.map(post => {
      const [year, month] = post.date.split('.')
      return { year, month, slug: post.slug }
    })
  }),
  c => {
    const { year, month, slug } = c.req.param()
    if (year.includes(':') || month.includes(':') || slug.includes(':')) {
      return c.text('404', 404)
    }

    const fields = [
      'title',
      'date',
      'slug',
      'author',
      'content',
      'ogImage',
      'coverImage',
      'excerpt',
    ]
    const blogPost = getPostByPath(year, month, slug, fields)
    const md = markdownit({
      html: true,
      linkify: true,
      typographer: true,
    })
    const innerHtml = md.render(blogPost.content)

    return c.render(
      <Layout>
        <BlogPost post={blogPost} innerHtml={innerHtml} />
      </Layout>
    )
  }
)

app.get('/note', async c => {
  const notePosts = getAllNotes()

  return c.render(
    <Layout>
      <Notes notes={notePosts} />
    </Layout>
  )
})

app.get(
  '/note/:year/:month/:day/:slug',
  ssgParams(async () => {
    const notes = getAllNotes()
    return notes.map(note => {
      const [, year, month, day, slug] = note.path.split('/')
      return { year, month, day, slug }
    })
  }),
  c => {
    const { year, month, day, slug } = c.req.param()
    if (year.includes(':') || month.includes(':') || day.includes(':') || slug.includes(':')) {
      return c.text('404', 404)
    }
    const note = getNoteByPath(year, month, day, slug)

    return c.render(
      <Layout>
        <NotePost note={note} />
      </Layout>
    )
  }
)

app.get('/works/screen-utsushi/licenses', c => {
  return c.render(
    <Layout>
      <Licenses />
    </Layout>
  )
})

app.get(
  '/works/:main/:sub',
  ssgParams(async () => [
    { main: 'ios-app', sub: 'menma' },
    { main: 'ios-app', sub: 'onchan' },
    { main: 'ios-app', sub: 'privacypolicy' },
    { main: 'ios-app', sub: 'terms' },
    { main: 'android-app', sub: 'menma' },
    { main: 'android-app', sub: 'privacypolicy' },
    { main: 'android-app', sub: 'terms' },
  ]),
  async c => {
    const { main, sub } = c.req.param()
    if (main.includes(':') || sub.includes(':')) {
      return c.text('404', 404)
    }
    const work = getWorkPostByPath(`${main}/${sub}`)

    const md = markdownit({
      html: true,
      linkify: true,
      typographer: true,
    }).use(markdownItImsize)
    const innerHtml = md.render(work.content)

    return c.render(
      <Layout>
        <WorkDetail innerHtml={innerHtml} />
      </Layout>
    )
  }
)

// Works pages handler factory
const createWorksHandler = (slug: string) => async (c: Context) => {
  const work = getWorkPostByPath(slug)

  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItImsize)
  const innerHtml = md.render(work.content)

  return c.render(
    <Layout>
      <WorkDetail innerHtml={innerHtml} />
    </Layout>
  )
}


// Register works routes
;['privacy', 'terms', 'screen-utsushi'].forEach(slug => {
  app.get(`/works/${slug}`, createWorksHandler(slug))
})

export default app
