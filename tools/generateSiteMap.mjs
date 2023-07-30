import { writeFileSync } from 'fs'
import { globby } from 'globby'

async function generateSiteMap() {
  const pages = await globby(['.next/server/app/**/**.html'])

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">   
      ${pages
        .map((page) => {
          const path = page
            .replace('/index', '')
            .replace('.next/server/app', '')
            .replace('.html', '')
          return `
      <url>
        <loc>${`https://dl10yr.com${path}`}</loc>
      </url>
              `
        })
        .join('')}
  </urlset>
  `

  writeFileSync('public/sitemap.xml', sitemap)
}

generateSiteMap()
