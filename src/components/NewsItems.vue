<script setup lang="ts">
import type { News } from '@/types/News'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import { getDomainName } from '@/utils/domain'
import { fetchHackerNewsResource } from '@/api/hackerNews'
import NewsItemMetadata from '@/components/NewsItemMetadata.vue'
import { createStoryDescription, type StorySeoMetadata } from '@/utils/seo'

interface Props {
  id: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  kids: [kids: number[]]
  seo: [metadata: StorySeoMetadata]
}>()

const news = await fetchHackerNewsResource<News>(`item/${props.id}`)
const url = news.url ?? ''

emit('kids', news.kids ?? [])
emit('seo', {
  id: news.id,
  title: news.title,
  description: createStoryDescription(undefined, news.by, news.score),
  publishedAt: news.time,
})

const domainName = getDomainName(url)
</script>

<template>
  <NewsItemLayout :score="news.score">
    <a
      :href="url || undefined"
      target="_blank"
      rel="noopener noreferrer"
      class="text-base sm:text-base font-medium leading-snug text-ink visited:text-faint underline-offset-2 decoration-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
      :class="{ 'hover:underline': domainName }"
    >
      {{ news.title }}
    </a>
    <NewsItemMetadata
      :author="news.by"
      :time="news.time"
      :kids="news.kids"
      :comments-to="`/news/${id}`"
      :domain="domainName"
    />
  </NewsItemLayout>
</template>
