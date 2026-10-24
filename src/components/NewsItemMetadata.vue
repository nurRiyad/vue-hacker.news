<script setup lang="ts">
import { formatCommentCount } from '@/utils/comments'
import { formatRelativeTime } from '@/utils/time'

interface Props {
  author?: string
  time: number
  kids?: number[]
  commentsTo?: string
}

const props = defineProps<Props>()

const authorName = props.author || 'no author available'
const createdAt = formatRelativeTime(props.time)
</script>

<template>
  <div class="flex text-xs sm:text-sm text-slate-500">
    <router-link :to="`/user/${authorName}`">
      by
      <span class="underline sm:no-underline sm:hover:underline hover:decoration-orange-500">{{
        authorName
      }}</span>
    </router-link>
    <template v-if="commentsTo">
      <p class="px-1 sm:px-4">|</p>
      <router-link :to="commentsTo">
        <p class="underline sm:no-underline sm:hover:underline hover:decoration-orange-500">
          {{ formatCommentCount(kids?.length) }}
        </p>
      </router-link>
    </template>
    <p class="px-1 sm:px-4">|</p>
    <p><span class="hidden sm:inline">created</span> {{ createdAt }}</p>
  </div>
</template>
