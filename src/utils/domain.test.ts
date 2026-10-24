import { describe, expect, it } from 'vite-plus/test'
import { getDomainName } from '@/utils/domain'

describe('getDomainName', () => {
  it('returns the hostname from an absolute URL', () => {
    expect(getDomainName('https://news.example.com/story/1')).toBe('news.example.com')
  })

  it.each([undefined, '', 'not a URL'])('returns an empty string for %s', (url) => {
    expect(getDomainName(url)).toBe('')
  })
})
