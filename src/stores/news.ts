import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchHackerNewsResource } from '@/api/hackerNews'

export const useNewStore = defineStore('newsStore', () => {
  const topNewsList = ref<Array<number>>([])
  const newNewsList = ref<Array<number>>([])
  const bestNewsList = ref<Array<number>>([])
  const topAsk = ref<Array<number>>([])
  const topShow = ref<Array<number>>([])
  const topJobs = ref<Array<number>>([])

  const storyLists = {
    top: { endpoint: 'topstories', state: topNewsList },
    new: { endpoint: 'newstories', state: newNewsList },
    best: { endpoint: 'beststories', state: bestNewsList },
    ask: { endpoint: 'askstories', state: topAsk },
    show: { endpoint: 'showstories', state: topShow },
    jobs: { endpoint: 'jobstories', state: topJobs },
  }

  const loaded = new Set<string>()
  const inFlight = new Map<string, Promise<void>>()
  const pendingRequests = ref(0)
  const isNewsListFetching = computed(() => pendingRequests.value > 0)

  const fetchNews = async (type: string) => {
    if (!Object.hasOwn(storyLists, type)) return
    const { endpoint, state } = storyLists[type as keyof typeof storyLists]
    if (loaded.has(endpoint)) return
    const existing = inFlight.get(endpoint)
    if (existing) return existing

    pendingRequests.value++
    const request = fetchHackerNewsResource<Array<number>>(endpoint)
      .then((ids) => {
        state.value = ids
        loaded.add(endpoint)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        inFlight.delete(endpoint)
        pendingRequests.value--
      })
    inFlight.set(endpoint, request)
    return request
  }

  return {
    topNewsList,
    newNewsList,
    bestNewsList,
    topAsk,
    topJobs,
    topShow,
    isNewsListFetching,
    fetchNews,
  }
})
