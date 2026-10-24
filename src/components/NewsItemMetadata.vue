<script setup lang="ts">
import { formatCommentCount } from '@/utils/comments'
import { formatRelativeTime } from '@/utils/time'

interface Props {
  author?: string
  time: number
  kids?: number[]
  commentsTo?: string
  domain?: string
}

const props = defineProps<Props>()

const authorName = props.author || 'no author available'
const createdAt = formatRelativeTime(props.time)
</script>

<template>
  <div
    class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted sm:text-sm [&>*+*]:before:mr-2 [&>*+*]:before:text-faint [&>*+*]:before:content-['·']"
  >
    <span v-if="domain" class="font-mono text-xs text-faint">{{ domain }}</span>
    <router-link
      :to="`/user/${authorName}`"
      class="group rounded hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
    >
      <span class="underline-offset-2 group-hover:underline">by {{ authorName }}</span>
    </router-link>
    <span>{{ createdAt }}</span>
    <router-link
      v-if="commentsTo"
      :to="commentsTo"
      class="group inline-flex items-center gap-1 rounded font-medium hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
      :class="{ 'text-faint font-normal': !kids?.length }"
    >
      <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
          d="M4 5h16v11H9l-5 4z"
        />
      </svg>
      <span class="underline-offset-2 group-hover:underline">{{
        formatCommentCount(kids?.length)
      }}</span>
    </router-link>
  </div>
</template>
