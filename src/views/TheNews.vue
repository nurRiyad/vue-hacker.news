<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useNewStore } from '@/stores/news'

const NewsLoader = defineAsyncComponent(() => import('@/components/NewsLoader.vue'))
const NewsItems = defineAsyncComponent(() => import('@/components/NewsItems.vue'))
const JobItem = defineAsyncComponent(() => import('@/components/JobItem.vue'))
const ShowItem = defineAsyncComponent(() => import('@/components/ShowItem.vue'))
const AskItem = defineAsyncComponent(() => import('@/components/AskItem.vue'))
const IconNext = defineAsyncComponent(() => import('@/components/icons/Next.vue'))
const IconPrevious = defineAsyncComponent(() => import('@/components/icons/Previous.vue'))
const EmptyNews = defineAsyncComponent(() => import('@/components/EmptyNews.vue'))

const route = useRoute()
const newsType = computed(() => Array.isArray(route.params.type) ? route.params.type[0] : route.params.type || 'top')

const newsStore = useNewStore()
const { topNewsList, newNewsList, bestNewsList, topAsk, topJobs, topShow, isNewsListFetching } = storeToRefs(newsStore)

const newsList = computed(() => {
  if (newsType.value === 'top')
    return topNewsList.value
  else if (newsType.value === 'new')
    return newNewsList.value
  else if (newsType.value === 'best')
    return bestNewsList.value
  else if (newsType.value === 'show')
    return topShow.value
  else if (newsType.value === 'ask')
    return topAsk.value
  else if (newsType.value === 'jobs')
    return topJobs.value
  return []
})

const currentPage = ref(1)
const totalPage = computed(() => {
  const totalNews = newsList.value?.length ?? 1
  if (totalNews % 20 === 0)
    return totalNews / 20
  else return Math.floor(totalNews / 20) + 1
})

const filteredNews = computed(() => {
  const fst = (currentPage.value - 1) * 20
  const lst = (currentPage.value * 20) - 1

  return newsList.value?.filter((val, idx) => {
    if (idx <= lst && idx >= fst)
      return true
    else return false
  })
})

const isNewsEmpty = computed(() => {
  if (filteredNews.value?.length > 0)
    return false
  else return true
})

const onNextClick = () => {
  if (currentPage.value !== totalPage.value)
    currentPage.value += 1
}

const onPreviousClick = () => {
  if (currentPage.value !== 1)
    currentPage.value -= 1
}
</script>

<template>
  <div class="flex flex-col bg-white h-full w-full">
    <template v-if="isNewsListFetching">
      <div v-for="n in 20" :key="n" class="flex-grow">
        <NewsLoader :id="n" />
      </div>
      <NewsLoader />
    </template>
    <template v-else>
      <div v-for="n in filteredNews" :key="n" class="flex-grow">
        <Suspense>
          <template #default>
            <JobItem v-if="newsType === 'jobs'" :id="n" />
            <ShowItem v-else-if="newsType === 'show'" :id="n" />
            <AskItem v-else-if="newsType === 'ask'" :id="n" />
            <NewsItems v-else :id="n" />
          </template>
          <template #fallback>
            <NewsLoader />
          </template>
        </Suspense>
      </div>
      <div v-if="isNewsEmpty" class="flex-grow">
        <EmptyNews />
      </div>
      <div class="flex justify-center items-center text-center my-2 py-2 space-x-3">
        <button :disabled="currentPage === 1" @click="onPreviousClick">
          <IconPrevious :width="20" />
        </button>
        <p> {{ currentPage }}/{{ totalPage }}</p>
        <button :disabled="currentPage === totalPage" @click="onNextClick">
          <IconNext :width="20" />
        </button>
      </div>
    </template>
  </div>
</template>
