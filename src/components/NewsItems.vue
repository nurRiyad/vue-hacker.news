<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { computed, watch } from 'vue'
import type { News } from '@/types/News'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import { getDomainName } from '@/utils/domain'
import QueryError from '@/components/QueryError.vue'
import { itemQuery } from '@/queries/hackerNews'
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

const { data: news, error, refresh, refetch } = useQuery(itemQuery<News>(props.id))
await refresh()

const story = computed(() => news.value)
const url = computed(() => story.value?.url ?? '')
const domainName = computed(() => getDomainName(url.value))

watch(
  story,
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
  <NewsItemLayout v-else-if="story" :score="story.score">
    <a
      :href="url || undefined"
      target="_blank"
      rel="noopener noreferrer"
      class="text-base sm:text-base font-medium leading-snug text-ink visited:text-faint underline-offset-2 decoration-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
      :class="{ 'hover:underline': domainName }"
    >
      {{ story.title }}
    </a>
    <NewsItemMetadata
      :author="story.by"
      :time="story.time"
      :kids="story.kids"
      :comments-to="`/news/${id}`"
      :domain="domainName"
    />
  </NewsItemLayout>
</template>
