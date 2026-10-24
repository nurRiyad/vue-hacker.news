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

vi.mock('@vueuse/core', () => ({ useFetch: useFetchMock }))

const respondWithLists = () => {
  useFetchMock.mockImplementation(async (url: string) => {
    const name = Object.keys(lists).find((key) => url.includes(`/${key}.json`))
    return { data: ref(JSON.stringify(name ? lists[name] : [])) }
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

  it('loads every story list from the Hacker News API', async () => {
    respondWithLists()
    const store = useNewStore()

    await store.fetchAllNews()

    expect(useFetchMock).toHaveBeenCalledTimes(6)
    expect(store.topNewsList).toEqual(lists.topstories)
    expect(store.newNewsList).toEqual(lists.newstories)
    expect(store.bestNewsList).toEqual(lists.beststories)
    expect(store.topAsk).toEqual(lists.askstories)
    expect(store.topShow).toEqual(lists.showstories)
    expect(store.topJobs).toEqual(lists.jobstories)
  })

  it('is fetching while requests are pending and idle afterwards', async () => {
    respondWithLists()
    const store = useNewStore()

    const pending = store.fetchAllNews()
    expect(store.isNewsListFetching).toBe(true)

    await pending
    expect(store.isNewsListFetching).toBe(false)
  })

  it('logs the error and stops fetching when a request fails', async () => {
    const error = new Error('network down')
    useFetchMock.mockRejectedValue(error)
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const store = useNewStore()

    await store.fetchAllNews()

    expect(consoleError).toHaveBeenCalledWith(error)
    expect(store.isNewsListFetching).toBe(false)
    expect(store.topNewsList).toEqual([])

    consoleError.mockRestore()
  })
})
