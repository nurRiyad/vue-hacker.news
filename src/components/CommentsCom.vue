<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { Comment } from '@/types/Comment'
import { timeDifferene } from '@/utils/time'
import NewsLoader from '@/components/NewsLoader.vue'
import CommentsCom from '@/components/CommentsCom.vue'

// set props
interface Props {
  id: number
}
const props = withDefaults(defineProps<Props>(), {
  id: NaN,
})

const { data: resp } = await useFetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json?print=pretty`)
const news = ref<Comment>(JSON.parse(resp.value as string))

const countTimedif = computed(() => {
  return timeDifferene(news.value.time)
})

const ttlComment = computed(() => {
  const childCommnet = news.value?.kids?.length || 0
  return childCommnet + 1
})

const commnetData = computed(() => {
  return news.value?.text || 'No comment availabe'
})

const showReply = ref(false)

const kids = computed(() => {
  return news.value?.kids || []
})
</script>

<template>
  <div class="bg-white px-5 pt-5 pb-2 text-sm">
    <p class="mb-2 border-b">
      <RouterLink :to="`/user/${news.by || '-'}`">
        <span class="hover:underline text-orange-600">{{ news.by || '-' }}</span>
      </RouterLink>
      | {{ countTimedif }} |
      <span>{{ ttlComment }} Comment</span>
    </p>
    <div class="text-xs text-slate-600 " v-html="commnetData" />
    <div v-if="(ttlComment > 1)" class="text-xs text-orange-600 pt-2 cursor-pointer hover:underline">
      <p v-if="showReply" @click="(showReply = !showReply)">
        Hide Comment [-]
      </p>
      <p v-else @click="(showReply = !showReply)">
        Show Reply {{ ttlComment }} [+]
      </p>
    </div>
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
