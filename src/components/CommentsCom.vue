<script setup lang="ts">
import type { Comment } from '@/types/Comment'
import { useToggle } from '@vueuse/core'
import CommentsCom from '@/components/CommentsCom.vue'
import NewsLoader from '@/components/NewsLoader.vue'
import { formatCommentCount } from '@/utils/comments'
import { fetchHackerNewsResource } from '@/api/hackerNews'
import { formatRelativeTime } from '@/utils/time'

interface Props {
  id: number
}
const props = withDefaults(defineProps<Props>(), {
  id: NaN,
})

const news = await fetchHackerNewsResource<Comment>(`item/${props.id}`)

const createdAt = formatRelativeTime(news.time)

const threadSize = (news.kids?.length ?? 0) + 1

const commnetData = news.text || 'No comment available'

const [showReply, toggleShowReply] = useToggle(false)

const kids = news.kids ?? []
</script>

<template>
  <div class="px-5 pt-5 pb-2 text-sm">
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
