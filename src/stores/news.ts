import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

export const useNewStore = defineStore('newsStore', () => {
  const topNewsList = ref<Array<number>>([])
  const newNewsList = ref<Array<number>>([])
  const bestNewsList = ref<Array<number>>([])
  const topAsk = ref<Array<number>>([])
  const topShow = ref<Array<number>>([])
  const topJobs = ref<Array<number>>([])
  const isNewsListFetching = ref<boolean>(false)

  const getTopNewsList = async () => {
    const { data } = await useFetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    topNewsList.value = JSON.parse(data.value as string) as Array<number>
  }

  const getNewNewsList = async () => {
    const { data } = await useFetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
    newNewsList.value = JSON.parse(data.value as string) as Array<number>
  }

  const getBestNewsList = async () => {
    const { data } = await useFetch('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty')
    bestNewsList.value = JSON.parse(data.value as string) as Array<number>
  }

  const getTopAsk = async () => {
    const { data } = await useFetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty')
    topAsk.value = JSON.parse(data.value as string) as Array<number>
  }

  const getTopJobs = async () => {
    const { data } = await useFetch('https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty')
    topJobs.value = JSON.parse(data.value as string) as Array<number>
  }

  const getTopShow = async () => {
    const { data } = await useFetch('https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty')
    topShow.value = JSON.parse(data.value as string) as Array<number>
  }

  const fetchAllNews = async () => {
    try {
      isNewsListFetching.value = true

      await Promise.all([getTopNewsList(), getBestNewsList(), getNewNewsList(), getTopAsk(), getTopShow(), getTopJobs()])
    }
    catch (error) {
      console.error(error)
    }
    isNewsListFetching.value = false
  }

  return { topNewsList, newNewsList, bestNewsList, topAsk, topJobs, topShow, isNewsListFetching, fetchAllNews }
})
