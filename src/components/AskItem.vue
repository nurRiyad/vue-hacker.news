<script setup lang="ts">
import type { Ask } from '@/types/Ask'
import NewsItemLayout from '@/components/NewsItemLayout.vue'
import NewsItemMetadata from '@/components/NewsItemMetadata.vue'
import { fetchHackerNewsResource } from '@/api/hackerNews'

// set props
interface Props {
  id: number
}
const props = defineProps<Props>()

// set emet
const emit = defineEmits<{ kids: [kids: number[]]; text: [text: string] }>()

const news = await fetchHackerNewsResource<Ask>(`item/${props.id}`)

emit('kids', news.kids ?? [])
emit('text', news.text ?? '')
</script>

<template>
  <NewsItemLayout :score="news.score">
    <div class="flex items-center font-mono space-x-1">
      <router-link
        :to="`/ask/${id}`"
        class="text-sm sm:text-base sm:truncate font-medium hover:decoration-orange-500 hover:underline"
      >
        {{ news.title }}
      </router-link>
    </div>
    <NewsItemMetadata
      :author="news.by"
      :time="news.time"
      :kids="news.kids"
      :comments-to="`/ask/${id}`"
    />
  </NewsItemLayout>
</template>
