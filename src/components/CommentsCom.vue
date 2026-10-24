<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { computed } from 'vue'
import type { Comment } from '@/types/Comment'
import { useToggle } from '@vueuse/core'
import CommentsCom from '@/components/CommentsCom.vue'
import NewsLoader from '@/components/NewsLoader.vue'
import QueryError from '@/components/QueryError.vue'
import { formatCommentCount } from '@/utils/comments'
import { itemQuery } from '@/queries/hackerNews'
import { formatRelativeTime } from '@/utils/time'

interface Props {
  id: number
}
const props = withDefaults(defineProps<Props>(), {
  id: NaN,
})

const { data, error, refresh, refetch } = useQuery(itemQuery<Comment>(props.id))
await refresh()

const news = computed(() => data.value)
const createdAt = computed(() => formatRelativeTime(news.value?.time ?? 0))

const threadSize = computed(() => (news.value?.kids?.length ?? 0) + 1)

const commnetData = computed(() => news.value?.text || 'No comment available')

const [showReply, toggleShowReply] = useToggle(false)

const kids = computed(() => news.value?.kids ?? [])

function retry() {
  void refetch()
}
</script>

<template>
  <QueryError v-if="error" @retry="retry" />
  <div v-else-if="news" class="px-5 pt-5 pb-2 text-sm">
    <p class="mb-2 border-b border-line">
      <RouterLink :to="`/user/${news.by || '-'}`">
        <span class="hover:underline text-accent">{{ news.by || '-' }}</span>
      </RouterLink>
      | {{ createdAt }} |
      <span>{{ formatCommentCount(threadSize) }}</span>
    </p>
    <div class="text-xs text-muted" v-html="commnetData" />
    <button
      v-if="threadSize > 1"
      type="button"
      class="text-xs text-accent pt-2 cursor-pointer hover:underline"
      :aria-expanded="showReply"
      @click="toggleShowReply()"
    >
      {{ showReply ? 'Hide Comment [-]' : `Show Reply ${threadSize} [+]` }}
    </button>
    <div class="ml-2">
      <div v-if="showReply">
        <div v-for="kid in kids" :key="kid" class="space-y-10">
          <Suspense>
            <template #default>
              <CommentsCom :id="kid" />
            </template>
            <template #fallback>
              <NewsLoader />
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>
