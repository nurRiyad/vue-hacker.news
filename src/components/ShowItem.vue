<script setup lang="ts">
import type { Show } from '@/types/Show'
import { useFetch } from '@vueuse/core'
import { formatCommentCount } from '@/utils/comments'
import { timeDifferene } from '@/utils/time'
import NewsItemLayout from '@/components/NewsItemLayout.vue'

// set props
interface Props {
  id: number
}
const props = defineProps<Props>()

// set emet
const emit = defineEmits<{ kids: [kids: number[]] }>()

const { data: resp } = await useFetch(
  `https://hacker-news.firebaseio.com/v0/item/${props.id}.json?print=pretty`,
)
const news = JSON.parse(resp.value as string) as Show
const author = news.by || 'no author available'

emit('kids', news.kids ?? [])

const commentCount = formatCommentCount(news.kids?.length)
const createdAt = timeDifferene(news.time)
</script>

<template>
  <NewsItemLayout :score="news.score">
    <div class="flex items-center font-mono space-x-1">
      <a
        :href="news.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm sm:text-base sm:truncate font-medium hover:decoration-orange-500 hover:underline"
      >
        {{ news.title }}
      </a>
    </div>
    <div class="flex text-xs sm:text-sm text-slate-500">
      <router-link :to="`/user/${author}`">
        by
        <span class="underline sm:no-underline sm:hover:underline hover:decoration-orange-500">{{
          author
        }}</span>
      </router-link>
      <p class="px-1 sm:px-4">|</p>
      <router-link :to="`/show/${id}`">
        <p class="underline sm:no-underline sm:hover:underline hover:decoration-orange-500">
          {{ commentCount }}
        </p>
      </router-link>
      <p class="px-1 sm:px-4">|</p>
      <p><span class="hidden sm:inline">created</span> {{ createdAt }}</p>
    </div>
  </NewsItemLayout>
</template>
