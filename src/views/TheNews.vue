<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, defineAsyncComponent, watch } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import NewsLoader from '@/components/NewsLoader.vue'
import { usePagination } from '@/composables/usePagination'
import { useNewStore } from '@/stores/news'
import { createPageHead } from '@/utils/seo'

const NewsItems = defineAsyncComponent(() => import('@/components/NewsItems.vue'))
const JobItem = defineAsyncComponent(() => import('@/components/JobItem.vue'))
const ShowItem = defineAsyncComponent(() => import('@/components/ShowItem.vue'))
const AskItem = defineAsyncComponent(() => import('@/components/AskItem.vue'))
const IconNext = defineAsyncComponent(() => import('@/components/icons/Next.vue'))
const IconPrevious = defineAsyncComponent(() => import('@/components/icons/Previous.vue'))
const EmptyNews = defineAsyncComponent(() => import('@/components/EmptyNews.vue'))

const route = useRoute()
const newsType = computed(() =>
  Array.isArray(route.params.type) ? route.params.type[0] : route.params.type || 'top',
)

const categorySeo: Partial<Record<string, { title: string; description: string }>> = {
  top: {
    title: 'Top stories',
    description: 'Read the top Hacker News stories about computer science and entrepreneurship.',
  },
  new: {
    title: 'New stories',
    description: 'Read the newest stories submitted to Hacker News.',
  },
  best: {
    title: 'Best stories',
    description: 'Browse the highest-rated stories on Hacker News.',
  },
  show: {
    title: 'Show HN',
    description: 'Explore projects shared by the Hacker News community.',
  },
  ask: {
    title: 'Ask HN',
    description: 'Read questions and discussions from the Hacker News community.',
  },
  jobs: {
    title: 'Hacker News jobs',
    description: 'Browse job listings shared on Hacker News.',
  },
}

const pageHead = computed(() => {
  const category = categorySeo[newsType.value]

  return createPageHead({
    title: category?.title ?? 'Page not found',
    description: category?.description ?? 'This Hacker News category does not exist.',
    path: route.path,
    robots: category ? undefined : 'noindex,follow',
  })
})

useHead(pageHead)

const newsStore = useNewStore()
const { topNewsList, newNewsList, bestNewsList, topAsk, topJobs, topShow, isNewsListFetching } =
  storeToRefs(newsStore)

const newsList = computed(() => {
  if (newsType.value === 'top') return topNewsList.value
  else if (newsType.value === 'new') return newNewsList.value
  else if (newsType.value === 'best') return bestNewsList.value
  else if (newsType.value === 'show') return topShow.value
  else if (newsType.value === 'ask') return topAsk.value
  else if (newsType.value === 'jobs') return topJobs.value
  return []
})

const {
  currentPage,
  totalPages: totalPage,
  currentItems: filteredNews,
  isEmpty: isNewsEmpty,
  nextPage: onNextClick,
  previousPage: onPreviousClick,
  resetPage,
} = usePagination(newsList)

watch(newsType, resetPage)
</script>

<template>
  <div class="flex flex-col h-full w-full">
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
      <div class="flex items-center justify-center gap-3 py-4 text-sm text-muted">
        <button
          class="rounded-full p-1 hover:bg-raised disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Previous page"
          :disabled="currentPage === 1"
          @click="onPreviousClick"
        >
          <IconPrevious :width="20" />
        </button>
        <p class="tabular-nums">Page {{ currentPage }} of {{ totalPage }}</p>
        <button
          class="rounded-full p-1 hover:bg-raised disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Next page"
          :disabled="currentPage === totalPage"
          @click="onNextClick"
        >
          <IconNext :width="20" />
        </button>
      </div>
    </template>
  </div>
</template>
