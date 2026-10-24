<script setup lang="ts">
import type { News } from '@/types/News'
import { useFetch } from '@vueuse/core'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import { formatCommentCount } from '@/utils/comments'
import { getDomainName } from '@/utils/domain'
import { timeDifferene } from '@/utils/time'

interface Props {
  id: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ kids: [kids: number[]] }>()

const { data: resp } = await useFetch(
  `https://hacker-news.firebaseio.com/v0/item/${props.id}.json?print=pretty`,
)
const news = JSON.parse(resp.value as string) as News
const author = news.by || 'no author available'
const url = news.url ?? ''

emit('kids', news.kids ?? [])

const domainName = getDomainName(url)
const commentCount = formatCommentCount(news.kids?.length)
const createdAt = timeDifferene(news.time)
</script>

<template>
  <NewsItemLayout :score="news.score" class="pr-3">
    <div class="flex items-center font-mono space-x-1">
      <a
        :href="url || undefined"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm sm:text-base sm:truncate font-medium hover:decoration-orange-500"
        :class="{ 'hover:underline': domainName }"
      >
        {{ news.title }}
      </a>
      <p v-if="domainName" class="hidden sm:block sm:truncate text-xs sm:text-sm text-slate-500">
        ({{ domainName }})
      </p>
    </div>
    <div class="flex text-xs sm:text-sm text-slate-500">
      <router-link :to="`/user/${author}`">
        by
        <span class="underline sm:no-underline sm:hover:underline hover:decoration-orange-500">{{
          author
        }}</span>
      </router-link>
      <p class="px-1 sm:px-4">|</p>
      <router-link :to="`/news/${id}`">
        <p class="underline sm:no-underline sm:hover:underline hover:decoration-orange-500">
          {{ commentCount }}
        </p>
      </router-link>
      <p class="px-1 sm:px-4">|</p>
      <p><span class="hidden sm:inline">created</span> {{ createdAt }}</p>
    </div>
  </NewsItemLayout>
</template>
