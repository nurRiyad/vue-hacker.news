import type { ReactiveHead } from '@vueuse/head'

export const SITE_NAME = 'Hacker News'
export const SITE_URL = 'https://hnews-nurriyad.netlify.app'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/android-chrome-512x512.png`
export const DEFAULT_OG_IMAGE_ALT = 'Hacker News app icon'

const namedHtmlEntities: Record<string, string> = {
  amp: '&',
  apos: "'",
  gt: '>',
  lt: '<',
  nbsp: ' ',
  quot: '"',
}

export interface StorySeoMetadata {
  id: number
  title: string
  description: string
  publishedAt: number
}

interface PageSeoOptions {
  title: string
  description: string
  path: string
  type?: 'website' | 'article' | 'profile'
  robots?: 'index,follow,max-image-preview:large' | 'noindex,follow'
  publishedAt?: number
  profileUsername?: string
}

export function createPageHead({
  title,
  description,
  path,
  type = 'website',
  robots = 'index,follow,max-image-preview:large',
  publishedAt,
  profileUsername,
}: PageSeoOptions): ReactiveHead {
  const canonicalUrl = new URL(path, SITE_URL).toString()
  const pageTitle = `${decodeHtmlEntities(title)} | ${SITE_NAME}`
  const pageDescription = limitDescription(description)
  const meta = [
    { name: 'description', content: pageDescription },
    { name: 'robots', content: robots },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: type },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: DEFAULT_OG_IMAGE },
    { property: 'og:image:alt', content: DEFAULT_OG_IMAGE_ALT },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '512' },
    { property: 'og:image:height', content: '512' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
    { name: 'twitter:image:alt', content: DEFAULT_OG_IMAGE_ALT },
    { name: 'twitter:url', content: canonicalUrl },
  ]

  if (publishedAt !== undefined) {
    meta.push({
      property: 'article:published_time',
      content: new Date(publishedAt * 1_000).toISOString(),
    })
  }

  if (profileUsername) {
    meta.push({ property: 'profile:username', content: profileUsername })
  }

  return {
    title: pageTitle,
    meta,
    link: [{ rel: 'canonical', href: canonicalUrl }],
  }
}

export function createStoryDescription(text: string | undefined, author: string, score: number) {
  const plainText = text
    ?.replace(/<[^>]*>/g, ' ')
    .replace(/&(#(?:x[\da-f]+|\d+)|[a-z]+);/gi, decodeHtmlEntity)
    .replace(/\s+/g, ' ')
    .trim()
  return limitDescription(
    plainText || `A Hacker News story submitted by ${author} with ${score} points.`,
  )
}

function decodeHtmlEntities(value: string) {
  return value.replace(/&(#(?:x[\da-f]+|\d+)|[a-z]+);/gi, decodeHtmlEntity)
}

function decodeHtmlEntity(entity: string, code: string) {
  if (!code.startsWith('#')) return namedHtmlEntities[code.toLowerCase()] ?? entity

  const codePoint =
    code[1]?.toLowerCase() === 'x'
      ? Number.parseInt(code.slice(2), 16)
      : Number.parseInt(code.slice(1), 10)

  return Number.isInteger(codePoint) && codePoint > 0 && codePoint <= 0x10ffff
    ? String.fromCodePoint(codePoint)
    : entity
}

function limitDescription(description: string) {
  const normalized = description
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,!?;:])/g, '$1')
    .trim()
  if (normalized.length <= 160) return normalized
  return `${normalized.slice(0, 157).trimEnd()}...`
}
