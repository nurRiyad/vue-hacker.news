<script setup lang="ts">
import type { Jobs } from '@/types/Jobs'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import { getDomainName } from '@/utils/domain'
import NewsItemMetadata from '@/components/NewsItemMetadata.vue'
import { fetchHackerNewsResource } from '@/api/hackerNews'

// set props
interface Props {
  id: number
}
const props = defineProps<Props>()

const news = await fetchHackerNewsResource<Jobs>(`item/${props.id}`)
const url = news.url ?? ''

const domainName = getDomainName(url)
</script>

<template>
  <NewsItemLayout :score="news.score">
    <div class="flex items-center font-mono space-x-1">
      <a
        :href="url"
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
    <NewsItemMetadata :author="news.by" :time="news.time" />
  </NewsItemLayout>
</template>
