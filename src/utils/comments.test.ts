import { describe, expect, it } from 'vite-plus/test'
import { formatCommentCount } from '@/utils/comments'

describe('formatCommentCount', () => {
  it.each([
    [0, '0 Comments'],
    [1, '1 Comment'],
    [2, '2 Comments'],
    [110, '110 Comments'],
  ])('formats %i as "%s"', (count, expected) => {
    expect(formatCommentCount(count)).toBe(expected)
  })

  // Hacker News omits `kids` on stories that have no comments.
  it('treats a missing count as zero', () => {
    expect(formatCommentCount(undefined)).toBe('0 Comments')
  })
})
