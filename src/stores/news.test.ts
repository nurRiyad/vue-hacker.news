import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { ref } from 'vue'
import { useNewStore } from '@/stores/news'

const lists: Record<string, Array<number>> = {
  topstories: [1, 2, 3],
  newstories: [4, 5],
  beststories: [6],
  askstories: [7, 8],
  showstories: [9],
  jobstories: [10, 11, 12],
}

const useFetchMock = vi.hoisted(() => vi.fn())

vi.mock('@vueuse/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vueuse/core')>()),
  useFetch: useFetchMock,
}))

const respondWithLists = () => {
  useFetchMock.mockImplementation((url: string) => {
    const name = Object.keys(lists).find((key) => url.includes(`/${key}.json`))
    return {
      get: () => ({
        json: async () => ({ data: ref(name ? lists[name] : []), error: ref(null) }),
      }),
    }
  })
}

describe('useNewStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useFetchMock.mockReset()
  })

  it('starts with empty lists and is not fetching', () => {
    const store = useNewStore()

    expect(store.topNewsList).toEqual([])
    expect(store.newNewsList).toEqual([])
    expect(store.bestNewsList).toEqual([])
    expect(store.topAsk).toEqual([])
    expect(store.topShow).toEqual([])
    expect(store.topJobs).toEqual([])
    expect(store.isNewsListFetching).toBe(false)
  })

  it('loads only the requested story list from the Hacker News API', async () => {
    respondWithLists()
    const store = useNewStore()

    await store.fetchNews('top')

    expect(useFetchMock).toHaveBeenCalledTimes(1)
    expect(useFetchMock).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/topstories.json',
    )
    expect(store.topNewsList).toEqual(lists.topstories)
    expect(store.newNewsList).toEqual([])
  })

  it.each([
    ['new', 'newNewsList', 'newstories'],
    ['best', 'bestNewsList', 'beststories'],
    ['ask', 'topAsk', 'askstories'],
    ['show', 'topShow', 'showstories'],
    ['jobs', 'topJobs', 'jobstories'],
  ] as const)('maps the %s category to its list', async (type, key, endpoint) => {
    respondWithLists()
    const store = useNewStore()

    await store.fetchNews(type)

    expect(store[key]).toEqual(lists[endpoint])
  })

  it('ignores unknown categories', async () => {
    const store = useNewStore()

    await store.fetchNews('nope')
    await store.fetchNews('toString')

    expect(useFetchMock).not.toHaveBeenCalled()
  })

  it('does not refetch a list that is loaded or in flight', async () => {
    respondWithLists()
    const store = useNewStore()

    await Promise.all([store.fetchNews('top'), store.fetchNews('top')])
    await store.fetchNews('top')

    expect(useFetchMock).toHaveBeenCalledTimes(1)
  })

  it('is fetching while requests are pending and idle afterwards', async () => {
    respondWithLists()
    const store = useNewStore()

    const pending = store.fetchNews('top')
    expect(store.isNewsListFetching).toBe(true)

    await pending
    expect(store.isNewsListFetching).toBe(false)
  })

  it('logs the error and stops fetching when a request fails', async () => {
    const error = new Error('network down')
    useFetchMock.mockReturnValue({
      get: () => ({ json: async () => ({ data: ref(null), error: ref(error) }) }),
    })
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const store = useNewStore()

    await store.fetchNews('top')

    expect(consoleError).toHaveBeenCalledWith(error)
    expect(store.isNewsListFetching).toBe(false)
    expect(store.topNewsList).toEqual([])

    await store.fetchNews('top')
    expect(useFetchMock).toHaveBeenCalledTimes(2)

    consoleError.mockRestore()
  })
})
