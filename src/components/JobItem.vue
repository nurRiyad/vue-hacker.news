<script setup lang="ts">
import type { Jobs } from '@/types/Jobs'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import { getDomainName } from '@/utils/domain'
import NewsItemMetadata from '@/components/NewsItemMetadata.vue'
import { fetchHackerNewsResource } from '@/api/hackerNews'

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
    <a
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-base sm:text-base font-medium leading-snug text-ink visited:text-faint underline-offset-2 decoration-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
      :class="{ 'hover:underline': domainName }"
    >
      {{ news.title }}
    </a>
    <NewsItemMetadata :author="news.by" :time="news.time" :domain="domainName" />
  </NewsItemLayout>
</template>
