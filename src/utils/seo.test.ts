import { describe, expect, it } from 'vite-plus/test'
import { createPageHead, createStoryDescription } from '@/utils/seo'

describe('createPageHead', () => {
  it('builds route-specific canonical and social metadata', () => {
    const head = createPageHead({
      title: 'Example story',
      description: 'A Hacker News story.',
      path: '/news/42',
      type: 'article',
      publishedAt: 1_700_000_000,
    })

    expect(head.title).toBe('Example story | Hacker News')
    expect(head.link).toContainEqual({
      rel: 'canonical',
      href: 'https://hnews-nurriyad.netlify.app/news/42',
    })
    expect(head.meta).toContainEqual({
      property: 'og:url',
      content: 'https://hnews-nurriyad.netlify.app/news/42',
    })
    expect(head.meta).toContainEqual({
      property: 'article:published_time',
      content: '2023-11-14T22:13:20.000Z',
    })
  })

  it('decodes HTML entities in page titles', () => {
    const head = createPageHead({
      title: 'An &#34;example&#34; story',
      description: 'A Hacker News story.',
      path: '/news/42',
    })

    expect(head.title).toBe('An "example" story | Hacker News')
  })
})

describe('createStoryDescription', () => {
  it('strips HTML from story text', () => {
    expect(createStoryDescription('<p>A discussion <b>about Vue</b>.</p>', 'alice', 10)).toBe(
      'A discussion about Vue.',
    )
  })

  it('decodes HTML entities in story text', () => {
    expect(
      createStoryDescription('An &#34;interesting&#34; article &amp; discussion.', 'alice', 10),
    ).toBe('An "interesting" article & discussion.')
  })

  it('uses a fallback and limits descriptions to 160 characters', () => {
    expect(createStoryDescription(undefined, 'alice', 10)).toBe(
      'A Hacker News story submitted by alice with 10 points.',
    )
    expect(createStoryDescription('story '.repeat(40), 'alice', 10).length).toBeLessThanOrEqual(160)
  })
})
