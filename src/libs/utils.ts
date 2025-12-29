import { JSDOM } from 'jsdom'
import { tokenize } from 'kuromojin'

export type Meta = {
  url: string
  title: string
  description: string
  image: string
  domain: string
}

export const getMetaData = async (url: string): Promise<Meta> => {
  const metaData = {
    url,
    title: '',
    description: '',
    image: '',
    domain: '',
  }
  try {
    metaData.domain = (url.match(/https?:\/\/[^/]+\//g) ?? '')[0] || ''
    let res = await fetch(url)
    const text = await res.text()
    let doms = new JSDOM(text)
    let metas = doms.window.document.getElementsByTagName('meta')
    let isSJIS = false

    for (const meta of metas) {
      if (meta.getAttribute('charset') === 'Shift_JIS') isSJIS = true
    }

    if (isSJIS) {
      res = await fetch(url)
      const arrayBuffer = await res.arrayBuffer()
      const html = decodeAsText(arrayBuffer, 'shift-jis')
      doms = new JSDOM(html)
      metas = doms.window.document.getElementsByTagName('meta')
    }

    for (const meta of metas) {
      const np = meta.getAttribute('name') || meta.getAttribute('property')
      if (typeof np !== 'string') continue
      if (np.match(/title/)) {
        metaData.title = meta.getAttribute('content') ?? ''
      }
      if (np.match(/description/)) {
        metaData.description = (meta.getAttribute('content') ?? '').slice(0, 100)
      }
      if (np.match(/image/)) {
        metaData.image = meta.getAttribute('content') ?? ''
      }
    }
  } catch (e) {
    // console.error(e)
  } finally {
    const hasDomainInImg = metaData.image.match(/https?:\/\/[^/]+\//g) !== null
    if (!hasDomainInImg) {
      metaData.image = metaData.domain + metaData.image
    }
  }
  return metaData
}

export const getUrlList = (content: string): Array<string> =>
  content.match(/https?:\/\/[^\n\]]*/g) ?? []

export const getRandom = <T>(list: Array<T>, numOfItems: number): Array<T> => {
  const randoms = [] as T[]
  while (randoms.length < Math.min(numOfItems, list.length)) {
    const item = list[Math.floor(Math.random() * list.length)]
    if (!randoms.includes(item)) randoms.push(item)
  }
  return randoms
}

export const decodeAsText = (arrayBuffer: ArrayBuffer, encoding: string): string =>
  new TextDecoder(encoding).decode(arrayBuffer)

export const capitalize = (value: string): string => value[0].toUpperCase() + value.slice(1)

const getToken = async (text: string): Promise<string[]> => {
  const res = await tokenize(text)
  const POS_LIST = [`名詞`, `動詞`, `形容詞`]
  const IGNORE_REGEX = /^[!-/:-@[-`{-~、-〜”’・0-9]+$/
  return res
    .filter(token => POS_LIST.includes(token.pos))
    .map(token => token.surface_form)
    .filter(word => !IGNORE_REGEX.test(word))
    .filter(word => word.length >= 2)
}

export const getTokens = async (words: string | string[]): Promise<string[]> => {
  if (!Array.isArray(words)) return await getToken(words)

  const tokens: string[] = []
  for (const word of words) {
    tokens.push(...(await getToken(word)))
  }
  return tokens
}
