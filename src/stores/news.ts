import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

export const useNewStore = defineStore('newsStore', () => {
  const topNewsList = ref<Array<number>>([])
  const newNewsList = ref<Array<number>>([])
  const bestNewsList = ref<Array<number>>([])

  const getTopNewsList = async () => {
    try {
      const { data } = await useFetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      topNewsList.value = data.value as Array<number>
    }
    catch (error) {
      console.log(error)
    }
  }

  const getNewNewsList = async () => {
    try {
      const { data } = await useFetch('https://hacker-news.firebaseio.com/v0/newstories.json')
      newNewsList.value = data.value as Array<number>
    }
    catch (error) {
      console.log(error)
    }
  }

  const getBestNewsList = async () => {
    try {
      const { data } = await useFetch('https://hacker-news.firebaseio.com/v0/beststories.json')
      bestNewsList.value = data.value as Array<number>
    }
    catch (error) {
      console.log(error)
    }
  }

  return { topNewsList, newNewsList, bestNewsList, getTopNewsList, getNewNewsList, getBestNewsList }
})
