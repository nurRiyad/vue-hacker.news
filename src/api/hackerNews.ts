import { useFetch } from '@vueuse/core'

const HACKER_NEWS_API_BASE_URL = 'https://hacker-news.firebaseio.com/v0'

export async function fetchHackerNewsResource<T>(resource: string): Promise<T> {
  const { data, error } = await useFetch(
    `${HACKER_NEWS_API_BASE_URL}/${resource}.json?print=pretty`,
  )
    .get()
    .json<T>()

  if (error.value) {
    throw error.value instanceof Error ? error.value : new Error(String(error.value))
  }

  if (data.value === null) {
    throw new Error(`Hacker News returned no data for "${resource}"`)
  }

  return data.value
}
