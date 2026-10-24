import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { timeDifferene } from '@/utils/time'

const NOW = new Date('2026-06-15T12:00:00')
const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const secondsAgo = (seconds: number) => Math.floor(NOW.getTime() / 1000) - seconds

describe('timeDifferene', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    ['just now', 30, 'now'],
    ['a minute', MINUTE, '1 minute ago'],
    ['several minutes', 5 * MINUTE, '5 minutes ago'],
    ['an hour', HOUR, '1 hour ago'],
    ['several hours', 5 * HOUR, '5 hours ago'],
    ['a day', DAY, '1 day ago'],
    ['several days', 5 * DAY, '5 days ago'],
    ['a month', 45 * DAY, '1 month ago'],
    ['several months', 100 * DAY, '3 months ago'],
    ['a year', 400 * DAY, '1 year ago'],
    ['several years', 3 * 365 * DAY + DAY, '3 years ago'],
  ])('formats %s', (_label, elapsedSeconds, expected) => {
    expect(timeDifferene(secondsAgo(elapsedSeconds))).toBe(expected)
  })
})
