<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { computed, watch } from 'vue'
import type { Show } from '@/types/Show'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import QueryError from '@/components/QueryError.vue'
import { itemQuery } from '@/queries/hackerNews'
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

const {
  data: queriedNews,
  error,
  refresh,
  refetch,
} = useQuery(() => itemQuery<Show>(props.id, !props.item))
if (!props.item) await refresh()

const news = computed(() => props.item ?? queriedNews.value)

watch(
  news,
  (item) => {
    if (!item) return

    emit('kids', item.kids ?? [])
    emit('seo', {
      id: item.id,
      title: item.title,
      description: createStoryDescription(undefined, item.by, item.score),
      publishedAt: item.time,
    })
  },
  { immediate: true },
)

function retry() {
  void refetch()
}
</script>

<template>
  <QueryError v-if="error" @retry="retry" />
  <NewsItemLayout v-else-if="news" :score="news.score">
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
