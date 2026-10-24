<script setup lang="ts">
import type { Show } from '@/types/Show'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import { fetchHackerNewsResource } from '@/api/hackerNews'
import NewsItemMetadata from '@/components/NewsItemMetadata.vue'

// set props
interface Props {
  id: number
}
const props = defineProps<Props>()

// set emet
const emit = defineEmits<{ kids: [kids: number[]] }>()

const news = await fetchHackerNewsResource<Show>(`item/${props.id}`)

emit('kids', news.kids ?? [])
</script>

<template>
  <NewsItemLayout :score="news.score">
    <div class="flex items-center font-mono space-x-1">
      <a
        :href="news.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm sm:text-base sm:truncate font-medium hover:decoration-orange-500 hover:underline"
      >
        {{ news.title }}
      </a>
    </div>
    <NewsItemMetadata
      :author="news.by"
      :time="news.time"
      :kids="news.kids"
      :comments-to="`/show/${id}`"
    />
  </NewsItemLayout>
</template>
