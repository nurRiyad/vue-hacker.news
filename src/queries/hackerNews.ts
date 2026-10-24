import { fetchHackerNewsResource } from '@/api/hackerNews'

const storyListEndpoints = {
  top: 'topstories',
  new: 'newstories',
  best: 'beststories',
  ask: 'askstories',
  show: 'showstories',
  jobs: 'jobstories',
} as const

export function storyListQuery(type: string) {
  const endpoint = Object.hasOwn(storyListEndpoints, type)
    ? storyListEndpoints[type as keyof typeof storyListEndpoints]
    : undefined

  return {
    key: ['stories', type] as const,
    enabled: endpoint !== undefined,
    query: () =>
      endpoint ? fetchHackerNewsResource<number[]>(endpoint) : Promise.resolve([] as number[]),
  }
}

export function itemQuery<T>(id: number, enabled = true) {
  return {
    key: ['item', id] as const,
    enabled,
    query: () => fetchHackerNewsResource<T>(`item/${id}`),
  }
}

export function userQuery<T>(username: string) {
  return {
    key: ['user', username] as const,
    enabled: Boolean(username),
    query: () => fetchHackerNewsResource<T>(`user/${username}`),
  }
}
