<script setup lang="ts">
import type { Ask } from '@/types/Ask'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import NewsItemMetadata from '@/components/NewsItemMetadata.vue'
import { fetchHackerNewsResource } from '@/api/hackerNews'
import { createStoryDescription, type StorySeoMetadata } from '@/utils/seo'

interface Props {
  id: number
}
const props = defineProps<Props>()

const emit = defineEmits<{
  kids: [kids: number[]]
  text: [text: string]
  seo: [metadata: StorySeoMetadata]
}>()

const news = await fetchHackerNewsResource<Ask>(`item/${props.id}`)

emit('kids', news.kids ?? [])
emit('text', news.text ?? '')
emit('seo', {
  id: news.id,
  title: news.title,
  description: createStoryDescription(news.text, news.by, news.score),
  publishedAt: news.time,
})
</script>

<template>
  <NewsItemLayout :score="news.score">
    <router-link
      :to="`/ask/${id}`"
      class="text-base sm:text-base font-medium leading-snug text-ink visited:text-faint underline-offset-2 decoration-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent hover:underline"
    >
      {{ news.title }}
    </router-link>
    <NewsItemMetadata
      :author="news.by"
      :time="news.time"
      :kids="news.kids"
      :comments-to="`/ask/${id}`"
    />
  </NewsItemLayout>
</template>
