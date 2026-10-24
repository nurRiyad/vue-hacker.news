<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { computed, defineAsyncComponent, watch } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import NewsLoader from '@/components/NewsLoader.vue'
import QueryError from '@/components/QueryError.vue'
import { usePagination } from '@/composables/usePagination'
import { useScoreSortedItems } from '@/composables/useScoreSortedItems'
import { storyListQuery } from '@/queries/hackerNews'
import type { Ask } from '@/types/Ask'
import type { Show } from '@/types/Show'
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

const {
  data: storyList,
  error: storyListError,
  isLoading: isNewsListFetching,
  refetch: refetchStoryList,
} = useQuery(() => storyListQuery(newsType.value))

const newsList = computed(() => storyList.value ?? [])

const {
  currentPage,
  totalPages: totalPage,
  currentItems: filteredNews,
  isEmpty: isNewsEmpty,
  nextPage: onNextClick,
  previousPage: onPreviousClick,
  resetPage,
} = usePagination(newsList)

const canSort = computed(() => newsType.value === 'ask' || newsType.value === 'show')
const sortByScore = computed(() => canSort.value && route.query.sort === 'score')
const {
  items: sortedItems,
  isLoading: isSorting,
  error: sortingError,
  refetch: refetchSortedItems,
} = useScoreSortedItems<Ask | Show>(filteredNews, sortByScore)

const displayedItems = computed(() =>
  sortByScore.value
    ? sortedItems.value.map((data) => ({ id: data.id, data }))
    : filteredNews.value.map((id) => ({ id, data: undefined })),
)

const pageError = computed(() => (sortByScore.value ? sortingError.value : storyListError.value))

function retryPageQuery() {
  if (sortByScore.value) void refetchSortedItems()
  else void refetchStoryList()
}

watch([newsType, sortByScore], resetPage)
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <nav
      v-if="canSort"
      class="flex items-center gap-1 border-b border-line px-3 py-2 text-sm"
      aria-label="Sort"
    >
      <RouterLink
        :to="{ path: route.path }"
        class="rounded-md px-3 py-1 font-medium transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-accent"
        :class="sortByScore ? 'text-muted' : 'bg-accent text-page hover:bg-accent'"
        :aria-current="sortByScore ? undefined : 'true'"
      >
        Newest
      </RouterLink>
      <RouterLink
        :to="{ path: route.path, query: { sort: 'score' } }"
        class="rounded-md px-3 py-1 font-medium transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-accent"
        :class="sortByScore ? 'bg-accent text-page hover:bg-accent' : 'text-muted'"
        :aria-current="sortByScore ? 'true' : undefined"
      >
        Best
      </RouterLink>
      <span v-if="sortByScore" class="ml-2 text-xs text-faint"
        >sorted by score within this page</span
      >
    </nav>
    <QueryError v-if="pageError" @retry="retryPageQuery" />
    <template v-else-if="isNewsListFetching || isSorting">
      <div v-for="n in 20" :key="n" class="flex-grow">
        <NewsLoader :id="n" />
      </div>
      <NewsLoader />
    </template>
    <template v-else>
      <div v-for="item in displayedItems" :key="item.id" class="flex-grow">
        <Suspense>
          <template #default>
            <JobItem v-if="newsType === 'jobs'" :id="item.id" />
            <ShowItem
              v-else-if="newsType === 'show'"
              :id="item.id"
              :item="item.data as Show | undefined"
            />
            <AskItem
              v-else-if="newsType === 'ask'"
              :id="item.id"
              :item="item.data as Ask | undefined"
            />
            <NewsItems v-else :id="item.id" />
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
