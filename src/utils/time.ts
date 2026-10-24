import { formatTimeAgo } from '@vueuse/core'

const relativeTimeUnits: Array<{
  max: number
  value: number
  name: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'
}> = [
  { max: 60_000, value: 1_000, name: 'second' },
  { max: 3_600_000, value: 60_000, name: 'minute' },
  { max: 86_400_000, value: 3_600_000, name: 'hour' },
  { max: 2_592_000_000, value: 86_400_000, name: 'day' },
  { max: 31_536_000_000, value: 2_592_000_000, name: 'month' },
  { max: Number.POSITIVE_INFINITY, value: 31_536_000_000, name: 'year' },
]

const relativeTimeMessages = {
  justNow: 'now',
  past: (value: string) => `${value} ago`,
  future: (value: string) => `in ${value}`,
  second: (value: number) => `${value} seconds`,
  minute: (value: number) => `${value} ${value === 1 ? 'minute' : 'minutes'}`,
  hour: (value: number) => `${value} ${value === 1 ? 'hour' : 'hours'}`,
  day: (value: number) => `${value} ${value === 1 ? 'day' : 'days'}`,
  month: (value: number) => `${value} ${value === 1 ? 'month' : 'months'}`,
  year: (value: number) => `${value} ${value === 1 ? 'year' : 'years'}`,
  invalid: '',
}

export function formatRelativeTime(createTime: number): string {
  return formatTimeAgo(new Date(createTime * 1_000), {
    units: relativeTimeUnits,
    messages: relativeTimeMessages,
    rounding: 'floor',
  })
}
