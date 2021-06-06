import Parser from 'rss-parser'

const parser = new Parser()

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
  return feedItems
}
