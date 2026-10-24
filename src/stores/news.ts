import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchHackerNewsResource } from '@/api/hackerNews'

export const useNewStore = defineStore('newsStore', () => {
  const topNewsList = ref<Array<number>>([])
  const newNewsList = ref<Array<number>>([])
  const bestNewsList = ref<Array<number>>([])
  const topAsk = ref<Array<number>>([])
  const topShow = ref<Array<number>>([])
  const topJobs = ref<Array<number>>([])
  const isNewsListFetching = ref<boolean>(false)

  const storyLists = [
    { endpoint: 'topstories', state: topNewsList },
    { endpoint: 'newstories', state: newNewsList },
    { endpoint: 'beststories', state: bestNewsList },
    { endpoint: 'askstories', state: topAsk },
    { endpoint: 'showstories', state: topShow },
    { endpoint: 'jobstories', state: topJobs },
  ]

  const fetchAllNews = async () => {
    isNewsListFetching.value = true
    try {
      await Promise.all(
        storyLists.map(async ({ endpoint, state }) => {
          state.value = await fetchHackerNewsResource<Array<number>>(endpoint)
        }),
      )
    } catch (error) {
      console.error(error)
    } finally {
      isNewsListFetching.value = false
    }
  }

  return {
    topNewsList,
    newNewsList,
    bestNewsList,
    topAsk,
    topJobs,
    topShow,
    isNewsListFetching,
    fetchAllNews,
  }
})
