<script setup lang="ts">
import type { News } from '@/types/News'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import { getDomainName } from '@/utils/domain'
import { fetchHackerNewsResource } from '@/api/hackerNews'
import NewsItemMetadata from '@/components/NewsItemMetadata.vue'

interface Props {
  id: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ kids: [kids: number[]] }>()

const news = await fetchHackerNewsResource<News>(`item/${props.id}`)
const url = news.url ?? ''

emit('kids', news.kids ?? [])

const domainName = getDomainName(url)
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
    <NewsItemMetadata
      :author="news.by"
      :time="news.time"
      :kids="news.kids"
      :comments-to="`/news/${id}`"
    />
  </NewsItemLayout>
</template>
