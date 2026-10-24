<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { computed, watch } from 'vue'
import type { Ask } from '@/types/Ask'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import NewsItemMetadata from '@/components/NewsItemMetadata.vue'
import QueryError from '@/components/QueryError.vue'
import { itemQuery } from '@/queries/hackerNews'
import { createStoryDescription, type StorySeoMetadata } from '@/utils/seo'

interface Props {
  id: number
  item?: Ask
}
const props = defineProps<Props>()

const emit = defineEmits<{
  kids: [kids: number[]]
  text: [text: string]
  seo: [metadata: StorySeoMetadata]
}>()

const {
  data: queriedNews,
  error,
  refresh,
  refetch,
} = useQuery(() => itemQuery<Ask>(props.id, !props.item))
if (!props.item) await refresh()

const news = computed(() => props.item ?? queriedNews.value)

watch(
  news,
  (item) => {
    if (!item) return

    emit('kids', item.kids ?? [])
    emit('text', item.text ?? '')
    emit('seo', {
      id: item.id,
      title: item.title,
      description: createStoryDescription(item.text, item.by, item.score),
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
