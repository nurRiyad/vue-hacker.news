<script setup lang="ts">
import type { Show } from '@/types/Show'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import { fetchHackerNewsResource } from '@/api/hackerNews'
import NewsItemMetadata from '@/components/NewsItemMetadata.vue'
import { createStoryDescription, type StorySeoMetadata } from '@/utils/seo'

interface Props {
  id: number
  item?: Show
}
const props = defineProps<Props>()

const emit = defineEmits<{
  kids: [kids: number[]]
  seo: [metadata: StorySeoMetadata]
}>()

const news = props.item ?? (await fetchHackerNewsResource<Show>(`item/${props.id}`))

emit('kids', news.kids ?? [])
emit('seo', {
  id: news.id,
  title: news.title,
  description: createStoryDescription(undefined, news.by, news.score),
  publishedAt: news.time,
})
</script>

<template>
  <NewsItemLayout :score="news.score">
    <a
      :href="news.url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-base sm:text-base font-medium leading-snug text-ink visited:text-faint underline-offset-2 decoration-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent hover:underline"
    >
      {{ news.title }}
    </a>
    <NewsItemMetadata
      :author="news.by"
      :time="news.time"
      :kids="news.kids"
      :comments-to="`/show/${id}`"
    />
  </NewsItemLayout>
</template>
