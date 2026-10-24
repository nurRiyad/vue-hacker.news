<script setup lang="ts">
import type { Comment } from '@/types/Comment'
import { useFetch } from '@vueuse/core'
import { ref } from 'vue'
import CommentsCom from '@/components/CommentsCom.vue'
import NewsLoader from '@/components/NewsLoader.vue'
import { formatCommentCount } from '@/utils/comments'
import { timeDifferene } from '@/utils/time'

// set props
interface Props {
  id: number
}
const props = withDefaults(defineProps<Props>(), {
  id: NaN,
})

const { data: resp } = await useFetch(
  `https://hacker-news.firebaseio.com/v0/item/${props.id}.json?print=pretty`,
)
const news = JSON.parse(resp.value as string) as Comment

const createdAt = timeDifferene(news.time)

const threadSize = (news.kids?.length ?? 0) + 1

const commnetData = news.text || 'No comment available'

const showReply = ref(false)

const kids = news.kids ?? []
</script>

<template>
  <div class="bg-white px-5 pt-5 pb-2 text-sm">
    <p class="mb-2 border-b">
      <RouterLink :to="`/user/${news.by || '-'}`">
        <span class="hover:underline text-orange-600">{{ news.by || '-' }}</span>
      </RouterLink>
      | {{ createdAt }} |
      <span>{{ formatCommentCount(threadSize) }}</span>
    </p>
    <div class="text-xs text-slate-600" v-html="commnetData" />
    <button
      v-if="threadSize > 1"
      type="button"
      class="text-xs text-orange-600 pt-2 cursor-pointer hover:underline"
      :aria-expanded="showReply"
      @click="showReply = !showReply"
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
