import Parser from 'rss-parser'

export type FeedItem = {
  title: string
  link: string
  isoDate: string
  dateMiliSeconds: number
}

const parser = new Parser()

export const sources = ['https://zenn.dev/dl10yr/feed', 'https://qiita.com/dl10yr/feed.atom']

const fetchFeedItems = async (url: string): Promise<FeedItem[]> => {
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
      } as FeedItem
    })
}

export const getFeedItems = async (sources: string[]): Promise<FeedItem[]> => {
  if (!sources?.length) return []
  let feedItems: FeedItem[] = []
  for (const url of sources) {
    const items = await fetchFeedItems(url)
    feedItems = [...feedItems, ...items]
  }
  feedItems.sort((a, b) => {
    return a.dateMiliSeconds >= b.dateMiliSeconds ? -1 : 1
  })
  return feedItems
}
