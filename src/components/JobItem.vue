<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { computed } from 'vue'
import type { Jobs } from '@/types/Jobs'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import { getDomainName } from '@/utils/domain'
import QueryError from '@/components/QueryError.vue'
import NewsItemMetadata from '@/components/NewsItemMetadata.vue'
import { itemQuery } from '@/queries/hackerNews'

interface Props {
  id: number
}
const props = defineProps<Props>()

const { data, error, refresh, refetch } = useQuery(itemQuery<Jobs>(props.id))
await refresh()

const news = computed(() => data.value)
const url = computed(() => news.value?.url ?? '')
const domainName = computed(() => getDomainName(url.value))

function retry() {
  void refetch()
}
</script>

<template>
  <QueryError v-if="error" @retry="retry" />
  <NewsItemLayout v-else-if="news" :score="news.score">
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
